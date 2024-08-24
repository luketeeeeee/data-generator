import { Request, Response } from "express";
import { exec } from "child_process";
import { promisify } from "util";
import { validateIPAddress } from "../../../utils/validateIpAddress";
import { createPingReport } from "../ping.services";

type PingReportBody = {
  isFlood: boolean;
  timeLimit: number;
  ipAddress: string;
};

const execPromise = promisify(exec);

export const create = async (req: Request, res: Response) => {
  const { isFlood, timeLimit, ipAddress } = req.body as PingReportBody;

  if (!validateIPAddress(ipAddress)) {
    return res.status(400).json({
      message: { error: "bad request" },
    });
  }

  try {
    const { stdout, stderr } = await execPromise(
      `ping ${isFlood ? "-f" : ""} -w ${timeLimit} -i 0.002 ${ipAddress}`,
    );

    if (stderr) {
      // Implement a way to save the error history
      // model PingError { id, errorString }
      return res.status(400).json({
        success: false,
        data: { error: "there's something wrong mate" },
      });
    }

    const resultArray = stdout.split("\n");
    resultArray.splice(1, 1);

    const packetsStats = resultArray[2].match(/\d+(\.\d+)?/g);
    const rttStats = resultArray[3].match(/\d+(\.\d+)?/g);

    if (packetsStats === null || rttStats === null) {
      return res.status(400).json({
        success: false,
        data: { error: "there's something wrong mate" },
      });
    }

    const packetsTransmitted = Number(packetsStats[0]);
    const packetsReceived = Number(packetsStats[1]);
    const packetLoss = Number(packetsStats[2]);
    const time = Number(packetsStats[3]);

    const rttMin = Number(rttStats[0]);
    const rttAvg = Number(rttStats[1]);
    const rttMax = Number(rttStats[2]);
    const rttMDev = Number(rttStats[3]);

    const newPingReport = await createPingReport({
      ipAddress,
      packetsTransmitted,
      packetsReceived,
      packetLoss,
      time,
      rttMin,
      rttAvg,
      rttMax,
      rttMDev,
    });

    return res.status(200).json({
      success: true,
      data: newPingReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: { error: (error as Error).message },
    });
  }
};

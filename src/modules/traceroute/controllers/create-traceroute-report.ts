import { Request, Response } from "express";
import { exec } from "child_process";
import { promisify } from "util";
import { validateIPAddress } from "../../../utils/validateIpAddress";
import { createTracerouteReport } from "../traceroute.services";
import { createHop } from "../../hop/hop.services";

type TracerouteReportBody = {
  ipAddress: string;
};

const execPromise = promisify(exec);

export const create = async (req: Request, res: Response) => {
  const { ipAddress } = req.body as TracerouteReportBody;

  if (!validateIPAddress(ipAddress)) {
    return res.status(400).json({
      message: { error: "bad request" },
    });
  }

  try {
    const { stdout, stderr } = await execPromise(`traceroute -n ${ipAddress}`);

    if (stderr) {
      return res.status(400).json({
        success: false,
        data: { error: "there's something wrong mate" },
      });
    }

    const resultArray = stdout
      .split("\n")
      .slice(1)
      .filter((line) => {
        const parts = line.trim().split(/\s+/);
        return parts.some((part) => part !== "*") && parts.length > 1;
      });

    const hops = resultArray
      .map((line) => {
        const parts = line.trim().split(/\s+/);
        const ipAddresses: string[] = [];
        const rttHopTimes: number[] = [];

        for (let i = 1; i < parts.length; i++) {
          if (/^\d+\.\d+\.\d+\.\d+$/.test(parts[i])) {
            ipAddresses.push(parts[i]);
          } else if (/^\d+(\.\d+)?$/.test(parts[i])) {
            const rtt = parseFloat(parts[i]);
            rttHopTimes.push(rtt);
          }
        }

        if (ipAddresses.length > 0 && rttHopTimes.length > 0) {
          return { ipAddresses, rttHopTimes };
        }

        return null;
      })
      .filter((hop) => hop !== null);

    const newTracerouteReport = await createTracerouteReport({
      ipAddress,
    });

    for (const hop of hops) {
      await createHop({
        ...hop,
        TracerouteReport: { connect: { id: newTracerouteReport.id } },
      });
    }

    return res.status(200).json({
      success: true,
      data: newTracerouteReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: { error: (error as Error).message },
    });
  }
};

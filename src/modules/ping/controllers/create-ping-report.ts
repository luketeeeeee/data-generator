import { Request, Response } from "express";
import { createPingReport } from "../ping.services";
import { exec } from "child_process";

type PingReportBody = {
  isFlood: boolean;
  timeLimit: number;
  ipAddress: string;
};

export const create = async (req: Request, res: Response) => {
  const { isFlood, timeLimit, ipAddress } = req.body as PingReportBody;

  if (!validateIPAddress(ipAddress)) {
    return res.status(400).json({
      message: { error: "bad request" },
    });
  }

  exec(
    `ping ${isFlood && "-f"} -w ${timeLimit} -i 0.002 ${ipAddress}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log({ error: (error as Error).message });
        return false;
      }

      if (stderr) {
        console.log({ stderr: `${stderr}` });
      }

      console.log(stdout);
    },
  );

  // const pingReportObject = {}

  try {
    // const newPingReport = await createPingReport();
  } catch (error) {
    return res.status(500).json({
      message: { error: (error as Error).message },
    });
  }
};

import { Request, Response } from "express";
import { findAllPingReports } from "../ping.services";

export const findAll = async (req: Request, res: Response) => {
  try {
    const allPingReports = await findAllPingReports();

    return res.status(200).json({
      success: true,
      data: allPingReports,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: { error: (error as Error).message },
    });
  }
};

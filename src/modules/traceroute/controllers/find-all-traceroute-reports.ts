import { Request, Response } from "express";
import { findAllTracerouteReports } from "../traceroute.services";

export const findAll = async (req: Request, res: Response) => {
  try {
    const tracerouteReports = await findAllTracerouteReports();

    return res.status(200).json({
      success: true,
      data: tracerouteReports,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: { error: (error as Error).message },
    });
  }
};

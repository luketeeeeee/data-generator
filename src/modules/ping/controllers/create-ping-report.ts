import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export const create = (req: Request, res: Response) => {
  const body = req.body as Prisma.PingReportCreateInput;
};

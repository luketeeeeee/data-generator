import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

export const findAllPingReports = () => {
  return prisma.pingReport.findMany({});
};

export const findPingReportsByIpAddress = (ipAddress: string) => {
  return prisma.pingReport.findMany({ where: { ipAddress } });
};

export const findPingReportById = (id: string) => {
  return prisma.pingReport.findUnique({ where: { id } });
};

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

export const createPingReport = (data: Prisma.PingReportCreateInput) => {
  return prisma.pingReport.create({ data });
};

export const updatePingReport = (
  id: string,
  data: Prisma.PingReportUpdateInput,
) => {
  return prisma.pingReport.update({ where: { id }, data });
};

export const deletePingReport = (id: string) => {
  return prisma.pingReport.delete({ where: { id } });
};

export const deletePingReportsByIpAddress = (ipAddress: string) => {
  return prisma.pingReport.deleteMany({ where: { ipAddress } });
};

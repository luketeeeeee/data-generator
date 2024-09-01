import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

export const findAllTracerouteReports = () => {
  return prisma.tracerouteReport.findMany({});
};

export const findTracerouteReportByIpAddress = (ipAddress: string) => {
  return prisma.tracerouteReport.findMany({ where: { ipAddress } });
};

export const findTracerouteReportById = (id: string) => {
  return prisma.tracerouteReport.findUnique({ where: { id } });
};

export const createTracerouteReport = (
  data: Prisma.TracerouteReportCreateInput,
) => {
  return prisma.tracerouteReport.create({ data, include: { hops: true } });
};

export const updateTracerouteReport = (
  id: string,
  data: Prisma.TracerouteReportUpdateInput,
) => {
  return prisma.tracerouteReport.update({ where: { id }, data });
};

export const deleteTracerouteReport = (id: string) => {
  return prisma.tracerouteReport.delete({ where: { id } });
};

export const deleteTracerouteReportsByIpAddress = (ipAddress: string) => {
  return prisma.tracerouteReport.deleteMany({ where: { ipAddress } });
};

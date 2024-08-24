import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

export const findAllHops = () => {
  return prisma.hop.findMany({});
};

export const findHopByIpAddress = (ipAddress: string) => {
  return prisma.hop.findMany({ where: { ipAddress } });
};

export const findTracerouteReportById = (id: string) => {
  return prisma.hop.findUnique({ where: { id } });
};

export const createTracerouteReport = (data: Prisma.TracerouteReportCreateInput) => {
  return prisma.hop.create({ data });
};

export const updateTracerouteReport = (
  id: string,
  data: Prisma.TracerouteReportUpdateInput,
) => {
  return prisma.hop.update({ where: { id }, data });
};

export const deleteTracerouteReport = (id: string) => {
  return prisma.hop.delete({ where: { id } });
};

export const deleteTracerouteReportsByIpAddress = (ipAddress: string) => {
  return prisma.hop.deleteMany({ where: { ipAddress } });
};

import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

export const findAllHops = () => {
  return prisma.hop.findMany({});
};

export const findHopByTracerouteReportId = (tracerouteReportId: string) => {
  return prisma.hop.findMany({ where: { tracerouteReportId } });
};

export const findHopById = (id: string) => {
  return prisma.hop.findUnique({ where: { id } });
};

export const createHop = (data: Prisma.HopCreateInput) => {
  return prisma.hop.create({ data });
};

export const deleteHopById = (id: string) => {
  return prisma.hop.delete({ where: { id } });
};

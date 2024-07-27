/*
  Warnings:

  - You are about to drop the `Hop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PingReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TracerouteReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hop" DROP CONSTRAINT "Hop_tracerouteReportId_fkey";

-- DropTable
DROP TABLE "Hop";

-- DropTable
DROP TABLE "PingReport";

-- DropTable
DROP TABLE "TracerouteReport";

-- CreateTable
CREATE TABLE "ping_reports" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "packetsTransmitted" INTEGER NOT NULL,
    "packetsReceived" INTEGER NOT NULL,
    "packetLoss" DOUBLE PRECISION NOT NULL,
    "time" INTEGER NOT NULL,
    "rttMin" DOUBLE PRECISION NOT NULL,
    "rttAvg" DOUBLE PRECISION NOT NULL,
    "rttMax" DOUBLE PRECISION NOT NULL,
    "rttMDev" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ping_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traceroute_reports" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "traceroute_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hops" (
    "id" TEXT NOT NULL,
    "ipAddresses" TEXT[],
    "rttHopTimes" DOUBLE PRECISION[],
    "tracerouteReportId" TEXT,

    CONSTRAINT "hops_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hops" ADD CONSTRAINT "hops_tracerouteReportId_fkey" FOREIGN KEY ("tracerouteReportId") REFERENCES "traceroute_reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

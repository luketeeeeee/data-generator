-- CreateTable
CREATE TABLE "PingReport" (
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

    CONSTRAINT "PingReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TracerouteReport" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "TracerouteReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hop" (
    "id" TEXT NOT NULL,
    "ipAddresses" TEXT[],
    "rttHopTimes" DOUBLE PRECISION[],
    "tracerouteReportId" TEXT,

    CONSTRAINT "Hop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hop" ADD CONSTRAINT "Hop_tracerouteReportId_fkey" FOREIGN KEY ("tracerouteReportId") REFERENCES "TracerouteReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

import express, { Response } from "express";
import cors from "cors";
import logger from "./utils/logger";
import { pingReportRoutes } from "./modules/ping";

const port = 8080;
const url = `http://localhost:${port}`;

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const healthCheckRouter = express.Router();

healthCheckRouter.route("/health").get(async (_, res: Response) => {
  res.send({ status: "ok" });
});

app.use("/", healthCheckRouter);

app.use("/ping-reports", pingReportRoutes);

app.listen(port, () => {
  logger.info(`🟢 servidor iniciado em ${url} 🟢`);
});

import express, { Response } from "express";
import cors from "cors";

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

app.listen(port, () => {
  console.log(`🟢 servidor iniciado em ${url} 🟢`);
});

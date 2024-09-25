import express from "express";
import { pingReportController } from "./controllers";

const router = express.Router();

// rota utilizada durante o desenvolvimento
router.route("/").get(pingReportController.findAll);
// rota principal responsável pelas requisições 
// para criação de relatórios de ping
router.route("/").post(pingReportController.create);

export default router;






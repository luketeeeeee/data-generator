import express from "express";
import { tracerouteReportController } from "./controllers";

const router = express.Router();

// rota utilizada durante o desenvolvimento
router.route("/").get(tracerouteReportController.findAll);
// rota principal responsável pelas requisições 
// para criação de relatórios de traceroute
router.route("/").post(tracerouteReportController.create);

export default router;

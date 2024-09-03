import express from "express";
import { tracerouteReportController } from "./controllers";

const router = express.Router();

router.route("/").get(tracerouteReportController.findAll);
router.route("/").post(tracerouteReportController.create);

export default router;

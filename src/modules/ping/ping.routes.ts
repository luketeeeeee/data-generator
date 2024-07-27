import express from "express";
import { pingReportController } from "./controllers";

const router = express.Router();

// router.route('/').get(pingController.findAll)
router.route("/").post(pingReportController.create);

export default router;

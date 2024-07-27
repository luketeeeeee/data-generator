import express from "express";
import { pingController } from "./controllers";

const router = express.Router();

// router.route('/').get(pingController.findAll)
router.route("/").post(pingController.create);

export default router;

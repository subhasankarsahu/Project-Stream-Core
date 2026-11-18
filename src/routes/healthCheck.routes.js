import { Router } from "express";
import { healthcheck, readyCheck } from "../controllers/healthCheck.controller.js";

const router = Router();

router.route("/").get(healthcheck);
router.route("/ready").get(readyCheck);

export default router;

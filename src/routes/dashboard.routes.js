import { Router } from "express";
import {
    getChannelStats,
    getChannelVideos,
    getTopPerformingVideos,
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/stats").get(getChannelStats);
router.route("/videos").get(getChannelVideos);
router.route("/top-videos").get(getTopPerformingVideos);

export default router;

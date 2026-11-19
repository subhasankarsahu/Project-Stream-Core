import { Router } from "express";
import {
    getLikedVideos,
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateObjectId } from "../middlewares/validation.middleware.js";

const router = Router();

router.use(verifyJWT);
router.get("/videos", getLikedVideos);
router.post("/video/:videoId", validateObjectId("videoId"), toggleVideoLike);
router.post("/comment/:commentId", validateObjectId("commentId"), toggleCommentLike);
router.post("/tweet/:tweetId", validateObjectId("tweetId"), toggleTweetLike);

export default router;

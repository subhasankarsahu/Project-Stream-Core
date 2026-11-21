import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getRelatedVideos,
    getSearchSuggestions,
    getTrendingVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validateObjectId } from "../middlewares/validation.middleware.js";

const router = Router();

// Public / Guest accessible routes
router.route("/").get(optionalAuth, getAllVideos);
router.route("/trending").get(optionalAuth, getTrendingVideos);
router.route("/search/suggestions").get(optionalAuth, getSearchSuggestions);
router.route("/:videoId/related").get(optionalAuth, validateObjectId("videoId"), getRelatedVideos);
router.route("/:videoId").get(optionalAuth, validateObjectId("videoId"), getVideoById);

// Protected routes (require login)
router.route("/").post(
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
    ]),
    publishAVideo
);

router
    .route("/:videoId")
    .delete(verifyJWT, validateObjectId("videoId"), deleteVideo)
    .patch(verifyJWT, validateObjectId("videoId"), upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(
    verifyJWT,
    validateObjectId("videoId"),
    togglePublishStatus
);

export default router;

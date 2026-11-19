import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory,
    addToWatchHistory,
    removeWatchHistoryItem,
    clearWatchHistory
} from "../controllers/user.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authRateLimiter } from "../middlewares/rateLimiter.middleware.js";
import {
    validateRegisterInput,
    validateLoginInput,
    validateObjectId
} from "../middlewares/validation.middleware.js";

const router = Router()

router.route("/register").post(
    authRateLimiter,
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    validateRegisterInput,
    registerUser
)

router.route("/login").post(authRateLimiter, validateLoginInput, loginUser)

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(optionalAuth, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory).delete(verifyJWT, clearWatchHistory)
router.route("/history/:videoId")
    .post(verifyJWT, validateObjectId("videoId"), addToWatchHistory)
    .delete(verifyJWT, validateObjectId("videoId"), removeWatchHistoryItem)

export default router
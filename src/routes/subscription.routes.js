import { Router } from "express";
import {
    checkSubscriptionStatus,
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import { validateObjectId } from "../middlewares/validation.middleware.js";

const router = Router();

// Public routes (anyone can see channel subscribers or channels a user follows)
router.route("/c/:channelId").get(optionalAuth, validateObjectId("channelId"), getUserChannelSubscribers);
router.route("/c/:channelId/status").get(optionalAuth, validateObjectId("channelId"), checkSubscriptionStatus);
router.route("/u/:subscriberId").get(optionalAuth, validateObjectId("subscriberId"), getSubscribedChannels);

// Protected routes (require login)
router.route("/c/:channelId").post(verifyJWT, validateObjectId("channelId"), toggleSubscription);

export default router;

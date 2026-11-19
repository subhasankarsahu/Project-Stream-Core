import { Router } from "express";
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route (anyone can view tweets of a user)
router.route("/user/:userId").get(optionalAuth, getUserTweets);

// Protected routes (require login)
router.route("/").post(verifyJWT, createTweet);
router.route("/:tweetId")
    .patch(verifyJWT, updateTweet)
    .delete(verifyJWT, deleteTweet);

export default router;

import { Router } from "express";
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import { validateObjectId, validateContent } from "../middlewares/validation.middleware.js";

const router = Router();

// Public route (anyone can view tweets of a user)
router.route("/user/:userId").get(optionalAuth, validateObjectId("userId"), getUserTweets);

// Protected routes (require login)
router.route("/").post(
    verifyJWT,
    validateContent({ field: "content", min: 1, max: 280 }),
    createTweet
);

router.route("/:tweetId")
    .patch(
        verifyJWT,
        validateObjectId("tweetId"),
        validateContent({ field: "content", min: 1, max: 280 }),
        updateTweet
    )
    .delete(verifyJWT, validateObjectId("tweetId"), deleteTweet);

export default router;

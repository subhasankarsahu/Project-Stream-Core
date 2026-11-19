import { Router } from "express";
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import { validateObjectId, validateContent } from "../middlewares/validation.middleware.js";

const router = Router();

// Public read / Protected write
router.route("/:videoId")
    .get(optionalAuth, validateObjectId("videoId"), getVideoComments)
    .post(
        verifyJWT,
        validateObjectId("videoId"),
        validateContent({ field: "content", min: 1, max: 1000 }),
        addComment
    );

router.route("/c/:commentId")
    .delete(verifyJWT, validateObjectId("commentId"), deleteComment)
    .patch(
        verifyJWT,
        validateObjectId("commentId"),
        validateContent({ field: "content", min: 1, max: 1000 }),
        updateComment
    );

export default router;

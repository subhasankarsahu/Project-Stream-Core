import { Router } from "express";
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Public read / Protected write
router.route("/:videoId")
    .get(optionalAuth, getVideoComments)
    .post(verifyJWT, addComment);

router.route("/c/:commentId")
    .delete(verifyJWT, deleteComment)
    .patch(verifyJWT, updateComment);

export default router;

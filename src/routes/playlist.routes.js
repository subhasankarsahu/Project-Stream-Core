import { Router } from "express";
import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import { validateObjectId, validateContent } from "../middlewares/validation.middleware.js";

const router = Router();

// Public routes (anyone can view playlists)
router.route("/:playlistId").get(optionalAuth, validateObjectId("playlistId"), getPlaylistById);
router.route("/user/:userId").get(optionalAuth, validateObjectId("userId"), getUserPlaylists);

// Protected routes (require login)
router.route("/").post(
    verifyJWT,
    validateContent({ field: "name", min: 1, max: 100 }),
    validateContent({ field: "description", min: 1, max: 1000 }),
    createPlaylist
);

router.route("/:playlistId")
    .patch(verifyJWT, validateObjectId("playlistId"), updatePlaylist)
    .delete(verifyJWT, validateObjectId("playlistId"), deletePlaylist);

router.route("/add/:videoId/:playlistId").patch(
    verifyJWT,
    validateObjectId("videoId", "playlistId"),
    addVideoToPlaylist
);

router.route("/remove/:videoId/:playlistId").patch(
    verifyJWT,
    validateObjectId("videoId", "playlistId"),
    removeVideoFromPlaylist
);

export default router;

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

const router = Router();

// Public routes (anyone can view playlists)
router.route("/:playlistId").get(optionalAuth, getPlaylistById);
router.route("/user/:userId").get(optionalAuth, getUserPlaylists);

// Protected routes (require login)
router.route("/").post(verifyJWT, createPlaylist);
router.route("/:playlistId")
    .patch(verifyJWT, updatePlaylist)
    .delete(verifyJWT, deletePlaylist);

router.route("/add/:videoId/:playlistId").patch(verifyJWT, addVideoToPlaylist);
router.route("/remove/:videoId/:playlistId").patch(verifyJWT, removeVideoFromPlaylist);

export default router;

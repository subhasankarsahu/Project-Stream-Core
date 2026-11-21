import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    const totalVideos = await Video.countDocuments({
        owner: req.user._id
    });

    const totalPublishedVideos = await Video.countDocuments({
        owner: req.user._id,
        isPublished: true
    });

    const totalSubscribers = await Subscription.countDocuments({
        channel: req.user._id
    });

    const viewsData = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $group: {
                _id: null,
                totalViews: {
                    $sum: "$views"
                }
            }
        }
    ]);

    const totalViews = viewsData[0]?.totalViews || 0;

    const likeData = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes"
            }
        },
        {
            $project: {
                likeCount: {
                    $size: "$likes"
                }
            }
        },
        {
            $group: {
                _id: null,
                totalLikes: {
                    $sum: "$likeCount"
                }
            }
        }
    ]);

    const totalLikes = likeData[0]?.totalLikes || 0;

    const commentData = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "video",
                as: "comments"
            }
        },
        {
            $group: {
                _id: null,
                totalComments: {
                    $sum: { $size: "$comments" }
                }
            }
        }
    ]);

    const totalComments = commentData[0]?.totalComments || 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            "Channel stats fetched successfully",
            {
                totalVideos,
                totalPublishedVideos,
                totalSubscribers,
                totalViews,
                totalLikes,
                totalComments
            }
        )
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find({
        owner: req.user._id
    }).sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Channel videos fetched successfully",
            videos
        )
    );
});

const getTopPerformingVideos = asyncHandler(async (req, res) => {
    const topVideos = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(req.user._id),
                isPublished: true
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes"
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "video",
                as: "comments"
            }
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" },
                commentsCount: { $size: "$comments" }
            }
        },
        {
            $project: {
                likes: 0,
                comments: 0
            }
        },
        {
            $sort: {
                views: -1,
                likesCount: -1
            }
        },
        {
            $limit: 5
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Top performing videos fetched successfully",
            topVideos
        )
    );
});

export {
    getChannelStats,
    getChannelVideos,
    getTopPerformingVideos
};

import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {Like} from "../models/like.model.js"
import {Comment} from "../models/comment.model.js"
import {Subscription} from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId, duration, category } = req.query;

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));

    const matchStage = {
        isPublished: true
    };

    if (category && category.trim().toLowerCase() !== "all") {
        matchStage.category = new RegExp(`^${category.trim()}$`, "i");
    }

    if (query?.trim()) {
        matchStage.$or = [
            {
                title: {
                    $regex: query.trim(),
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: query.trim(),
                    $options: "i"
                }
            }
        ];
    }

    if (duration) {
        const lowerDuration = duration.toLowerCase();
        if (lowerDuration === "short") {
            matchStage.duration = { $lt: 240 };
        } else if (lowerDuration === "medium") {
            matchStage.duration = { $gte: 240, $lte: 1200 };
        } else if (lowerDuration === "long") {
            matchStage.duration = { $gt: 1200 };
        }
    }

    if (userId) {
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid user id");
        }
        matchStage.owner = new mongoose.Types.ObjectId(userId);
    }

    const allowedSortFields = ["createdAt", "views", "duration", "title"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = sortType === "asc" ? 1 : -1;

    const aggregate = Video.aggregate([
        {
            $match: matchStage
        },
        {
            $sort: {
                [sortField]: sortOrder
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    { $project: { username: 1, fullname: 1, avatar: 1 } }
                ]
            }
        },
        {
            $unwind: "$owner"
        }
    ]);

    const options = {
        page: parsedPage,
        limit: parsedLimit
    };

    const videos = await Video.aggregatePaginate(
        aggregate,
        options
    );

    return res.status(200).json(
        new ApiResponse(200, "Videos fetched successfully", videos)
    );
});

const getTrendingVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));

    const aggregate = Video.aggregate([
        {
            $match: {
                isPublished: true
            }
        },
        {
            $sort: {
                views: -1,
                createdAt: -1
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    { $project: { username: 1, fullname: 1, avatar: 1 } }
                ]
            }
        },
        {
            $unwind: "$owner"
        }
    ]);

    const options = {
        page: parsedPage,
        limit: parsedLimit
    };

    const trendingVideos = await Video.aggregatePaginate(aggregate, options);

    return res.status(200).json(
        new ApiResponse(200, "Trending videos fetched successfully", trendingVideos)
    );
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, category = "General" } = req.body;

    if(!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if(!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if(!thumbnailLocalPath){
        throw new ApiError(400, "Thumbnail is required")
    }

    const uploadedVideo = await uploadOnCloudinary(videoLocalPath);
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if(!uploadedVideo || !uploadedThumbnail) {
        throw new ApiError(500, "Upload failed");
    }

    const video = await Video.create({
        title,
        description,
        category: category?.trim() || "General",
        videoFile: uploadedVideo.url,
        thumbnail: uploadedThumbnail.url,
        duration: uploadedVideo.duration,
        owner: req.user._id
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Video published successfully", video)
        );
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video Id");
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { views: 1 } },
        { new: true }
    ).populate("owner", "username fullname avatar")

    if(!video) {
        throw new ApiError(404, "Video not found")
    }

    if (req.user?._id) {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { watchHistory: video._id }
        });
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                watchHistory: {
                    $each: [video._id],
                    $position: 0,
                    $slice: 100
                }
            }
        });
    }

    const [likesCount, commentsCount, isLiked, subscribersCount, isSubscribed] = await Promise.all([
        Like.countDocuments({ video: video._id }),
        Comment.countDocuments({ video: video._id }),
        req.user?._id ? Like.exists({ video: video._id, likedBy: req.user._id }) : false,
        video.owner?._id ? Subscription.countDocuments({ channel: video.owner._id }) : 0,
        req.user?._id && video.owner?._id ? Subscription.exists({ channel: video.owner._id, subscriber: req.user._id }) : false
    ]);

    const enrichedVideo = {
        ...video.toObject(),
        likesCount,
        commentsCount,
        isLiked: Boolean(isLiked),
        owner: {
            ...(video.owner?.toObject ? video.owner.toObject() : video.owner),
            subscribersCount,
            isSubscribed: Boolean(isSubscribed)
        }
    };

    return res.status(200).json(
            new ApiResponse(200, "Video fetched successfully", enrichedVideo)
    );
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if(!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const video = await Video.findById(videoId)

    if(!video) {
        throw new ApiError(404, "Video not found")
    }

    if(video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized")
    }

    const thumbnailLocalPath = req.file?.path;

    let thumbnailUrl = video.thumbnail;

    if(thumbnailLocalPath) {
        const thumbnail = await uploadOnCloudinary(
            thumbnailLocalPath
        );

        if (thumbnail?.url) {
            if (video.thumbnail) {
                await deleteFromCloudinary(video.thumbnail, "image").catch(() => {});
            }
            thumbnailUrl = thumbnail.url;
        }
    }

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title: title || video.title,
                description: description || video.description,
                category: req.body.category !== undefined ? req.body.category.trim() : video.category,
                thumbnail: thumbnailUrl
            }            
        },
        {
            new: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Video updated successfully", updatedVideo)
        );
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);

    if(!video) {
        throw new ApiError(404, "Video not found")
    }

    if(video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized")
    }

    if (video.videoFile) {
        await deleteFromCloudinary(video.videoFile, "video").catch(() => {});
    }
    if (video.thumbnail) {
        await deleteFromCloudinary(video.thumbnail, "image").catch(() => {});
    }

    await Video.findByIdAndDelete(videoId);

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Video deleted successfully", {})
        );
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    video.isPublished = !video.isPublished;

    await video.save();

    return res.status(200).json(
        new ApiResponse(200, "Publish status updated", video)
    );
})

export {
    getAllVideos,
    getTrendingVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
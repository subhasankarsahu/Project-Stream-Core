import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    const totalVideos = await Video.countDocuments({
        owner: req.user._id
    })

    const totalSubscribers = await Video.aggregate([
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
                    $sum: "$likesCount"
                }
            }
        }
    ]);

    const totalLikes = likes[0]?.totalLikes || 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalVideos,
                totalSubscribers,
                totalViews,
                totalLikes
            },
            "Channel stats fetched successfully"
        )
    );
});

const getChannelVideos = asyncHandler(
async (req, res) => {

    const videos = await Video.find({
        owner: req.user._id
    })
    .sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Channel videos fetched successfully"
        )
    );
});

export {
    getChannelStats, 
    getChannelVideos
    }
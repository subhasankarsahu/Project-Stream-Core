import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const currentUserId = req.user?._id ? new mongoose.Types.ObjectId(req.user._id) : null;

    const comments = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullname: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "likes"
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                },
                likesCount: {
                    $size: "$likes"
                },
                isLiked: {
                    $cond: {
                        if: {
                            $and: [
                                { $ne: [currentUserId, null] },
                                { $in: [currentUserId, "$likes.likedBy"] }
                            ]
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                likes: 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Comments fetched successfully",
            comments
        )
    );
});

const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    if (!content?.trim()) {
        throw new ApiError(
            400,
            "Comment content is required"
        );
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            "Comment added successfully",
            comment
        )
    );
});

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(
            400,
            "Invalid comment id"
        );
    }

    if (!content?.trim()) {
        throw new ApiError(
            400,
            "Content is required"
        );
    }

    const comment =
        await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found"
        );
    }

    if (
        comment.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized"
        );
    }

    comment.content = content;

    await comment.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Comment updated successfully",
            comment
        )
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(
            400,
            "Invalid comment id"
        );
    }

    const comment =
        await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found"
        );
    }

    if (
        comment.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized"
        );
    }

    await Comment.findByIdAndDelete(
        commentId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Comment deleted successfully",
            {}
        )
    );
});

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
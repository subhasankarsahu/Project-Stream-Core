import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

/**
 * Validates that specified request parameters are valid MongoDB ObjectIds.
 * @param  {...string} paramNames - Route param names to validate (e.g. 'videoId', 'userId')
 */
export const validateObjectId = (...paramNames) => {
    return (req, _, next) => {
        for (const param of paramNames) {
            const id = req.params[param];
            if (id && !mongoose.isValidObjectId(id)) {
                return next(new ApiError(400, `Invalid ${param}: '${id}' is not a valid ObjectId`));
            }
        }
        next();
    };
};

/**
 * Validates user registration fields (username format, email format, password length).
 */
export const validateRegisterInput = (req, _, next) => {
    const { username, email, fullName, password } = req.body;

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
        return next(new ApiError(400, "Full name is required and cannot be empty"));
    }

    if (!username || typeof username !== "string") {
        return next(new ApiError(400, "Username is required"));
    }

    const cleanUsername = username.trim().toLowerCase();
    const usernameRegex = /^[a-z0-9_]{3,30}$/;
    if (!usernameRegex.test(cleanUsername)) {
        return next(
            new ApiError(
                400,
                "Username must be 3-30 characters long and contain only lowercase letters, numbers, and underscores"
            )
        );
    }
    req.body.username = cleanUsername;

    if (!email || typeof email !== "string") {
        return next(new ApiError(400, "Email is required"));
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
        return next(new ApiError(400, "Invalid email address format"));
    }
    req.body.email = cleanEmail;

    if (!password || typeof password !== "string" || password.length < 6) {
        return next(new ApiError(400, "Password must be at least 6 characters long"));
    }

    next();
};

/**
 * Validates user login payload.
 */
export const validateLoginInput = (req, _, next) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        return next(new ApiError(400, "Username or email is required"));
    }

    if (!password || typeof password !== "string") {
        return next(new ApiError(400, "Password is required"));
    }

    if (username) req.body.username = username.trim().toLowerCase();
    if (email) req.body.email = email.trim().toLowerCase();

    next();
};

/**
 * Validates text content fields (e.g. comments, tweets) with configurable limits.
 */
export const validateContent = ({ field = "content", min = 1, max = 1000 } = {}) => {
    return (req, _, next) => {
        const val = req.body[field];

        if (typeof val !== "string" || !val.trim()) {
            return next(new ApiError(400, `${field} is required and cannot be empty`));
        }

        const trimmed = val.trim();
        if (trimmed.length < min) {
            return next(new ApiError(400, `${field} must be at least ${min} character(s) long`));
        }

        if (trimmed.length > max) {
            return next(new ApiError(400, `${field} cannot exceed ${max} characters`));
        }

        req.body[field] = trimmed;
        next();
    };
};

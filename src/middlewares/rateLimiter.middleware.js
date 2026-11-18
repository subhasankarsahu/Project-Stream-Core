import { ApiError } from "../utils/ApiError.js";

/**
 * Creates an in-memory rate limiter middleware with automatic sliding window expiration.
 *
 * @param {Object} options
 * @param {number} options.windowMs - Time window in milliseconds (default: 15 minutes)
 * @param {number} options.max - Max requests per window (default: 100)
 * @param {string} options.message - Error message when rate limit is exceeded
 * @param {Function} [options.keyGenerator] - Custom key generator (default: IP address)
 * @returns {Function} Express middleware
 */
export const createRateLimiter = ({
    windowMs = 15 * 60 * 1000,
    max = 100,
    message = "Too many requests from this IP, please try again later",
    keyGenerator = (req) => req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "global"
} = {}) => {
    const hits = new Map();

    // Periodic sweep to prevent memory leak
    const sweepInterval = setInterval(() => {
        const now = Date.now();
        for (const [key, record] of hits.entries()) {
            if (now > record.resetTime) {
                hits.delete(key);
            }
        }
    }, Math.min(windowMs, 60 * 1000));

    if (sweepInterval.unref) {
        sweepInterval.unref();
    }

    return (req, res, next) => {
        const key = keyGenerator(req);
        const now = Date.now();

        let record = hits.get(key);

        if (!record || now > record.resetTime) {
            record = {
                count: 1,
                resetTime: now + windowMs
            };
            hits.set(key, record);
        } else {
            record.count += 1;
        }

        const remaining = Math.max(0, max - record.count);
        const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

        res.setHeader("RateLimit-Limit", max);
        res.setHeader("RateLimit-Remaining", remaining);
        res.setHeader("RateLimit-Reset", resetSeconds);

        if (record.count > max) {
            res.setHeader("Retry-After", resetSeconds);
            return next(new ApiError(429, message));
        }

        next();
    };
};

// Rate limiter for general API routes (300 requests / 15 minutes)
export const apiRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: "Too many API requests, please slow down."
});

// Strict rate limiter for authentication endpoints (20 requests / 15 minutes)
export const authRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many authentication attempts, please try again in 15 minutes."
});

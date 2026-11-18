/**
 * Lightweight HTTP request logger middleware.
 * Outputs method, path, response status, duration, and client IP.
 */
export const requestLogger = (req, res, next) => {
    // Avoid noisy logging during test runs
    if (process.env.NODE_ENV === "test") {
        return next();
    }

    const start = Date.now();
    const { method, originalUrl } = req;

    res.on("finish", () => {
        const duration = Date.now() - start;
        const statusCode = res.statusCode;
        const ip = req.ip || req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "-";
        const timestamp = new Date().toISOString();

        console.log(`[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms - ${ip}`);
    });

    next();
};

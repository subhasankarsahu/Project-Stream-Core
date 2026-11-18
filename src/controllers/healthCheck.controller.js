import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const healthcheck = asyncHandler(async (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    let dbStatus = "disconnected";
    let dbLatencyMs = null;

    if (isDbConnected && mongoose.connection.db) {
        try {
            const start = Date.now();
            await mongoose.connection.db.admin().ping();
            dbLatencyMs = Date.now() - start;
            dbStatus = "connected";
        } catch {
            dbStatus = "error";
        }
    }

    const memoryUsage = process.memoryUsage();

    const healthData = {
        status: isDbConnected ? "ok" : "degraded",
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        environment: process.env.NODE_ENV || "development",
        nodeVersion: process.version,
        database: {
            status: dbStatus,
            readyState: mongoose.connection.readyState,
            latencyMs: dbLatencyMs,
            host: mongoose.connection.host || null,
            name: mongoose.connection.name || null
        },
        memory: {
            rss: formatBytes(memoryUsage.rss),
            heapTotal: formatBytes(memoryUsage.heapTotal),
            heapUsed: formatBytes(memoryUsage.heapUsed),
            external: formatBytes(memoryUsage.external)
        }
    };

    return res.status(200).json(
        new ApiResponse(200, "Service health status fetched", healthData)
    );
});

const readyCheck = asyncHandler(async (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
        throw new ApiError(503, "Service unavailable: Database connection not ready");
    }

    return res.status(200).json(
        new ApiResponse(200, "Service is ready to handle traffic", {
            status: "ready",
            database: "connected"
        })
    );
});

export { healthcheck, readyCheck };

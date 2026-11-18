import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app.js";
import connectDB from "./db/index.js";

const requiredEnvironmentVariables = [
    "MONGODB_URI",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRATION",
    "REFRESH_TOKEN_EXPIRATION",
];

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
    (name) => !process.env[name]
);

if (missingEnvironmentVariables.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missingEnvironmentVariables.join(", ")}`
    );
}

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        const gracefulShutdown = async (signal) => {
            console.log(`\nReceived ${signal}. Gracefully shutting down...`);
            server.close(async () => {
                console.log("HTTP server closed.");
                try {
                    await mongoose.connection.close(false);
                    console.log("MongoDB connection closed.");
                    process.exit(0);
                } catch (error) {
                    console.error("Error during MongoDB disconnection:", error);
                    process.exit(1);
                }
            });

            setTimeout(() => {
                console.error("Forceful shutdown after timeout.");
                process.exit(1);
            }, 10000).unref();
        };

        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
        process.on("SIGINT", () => gracefulShutdown("SIGINT"));

        process.on("unhandledRejection", (reason, promise) => {
            console.error("Unhandled Rejection at:", promise, "reason:", reason);
        });

        process.on("uncaughtException", (error) => {
            console.error("Uncaught Exception thrown:", error);
            process.exit(1);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });

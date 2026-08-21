import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
.then(
    () => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
)
.catch((err) => {
    console.log("MONGO db connection failed !!!", err);
    
})

/*
import express from "express";
const app = express();

( async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB");
        app.on("error", (error) => {
            console.error("ERROR: ",error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("ERROR: ",error);
        throw error;
    }
})()

*/
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadDirectory = path.resolve("public", "temp");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory)
  },
  filename: function (req, file, cb) {
    cb(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
  }
})

export const upload = multer({ 
    storage,
    limits: { fileSize: 250 * 1024 * 1024 },
})
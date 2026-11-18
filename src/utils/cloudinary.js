import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // File has been uploaded successfully
        // console.log("File is uploaded on cloudinary", response.url);
        await fs.promises.unlink(localFilePath).catch(() => {})
        return response
        
    } catch (error) {
        await fs.promises.unlink(localFilePath).catch(() => {})
        return null;
    }
}

const extractPublicId = (urlOrId) => {
    if (!urlOrId || typeof urlOrId !== "string") {
        return null;
    }

    if (!urlOrId.includes("cloudinary.com") && !urlOrId.includes("/upload/")) {
        return urlOrId.replace(/\.[^/.]+$/, "");
    }

    try {
        const afterUpload = urlOrId.split("/upload/")[1];
        if (!afterUpload) return null;

        const segments = afterUpload.split("/");
        // If first segment is version (e.g., v123456789), skip it
        if (/^v\d+$/.test(segments[0])) {
            segments.shift();
        }

        const pathWithExt = segments.join("/");
        return pathWithExt.replace(/\.[^/.]+$/, "");
    } catch {
        return null;
    }
};

const deleteFromCloudinary = async (publicIdOrUrl, resourceType = "image") => {
    try {
        if (!publicIdOrUrl) return null;

        const publicId = extractPublicId(publicIdOrUrl);
        if (!publicId) return null;

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
            invalidate: true
        });

        return response;
    } catch (error) {
        console.error("Cloudinary deletion failed:", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary, extractPublicId }
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.warn("No local file path provided.");
      return null;
    }

    const absolutePath = path.resolve(localFilePath); // Normalize for Windows

    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded successfully:", response.secure_url);

    fs.unlinkSync(absolutePath); // Cleanup
    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };

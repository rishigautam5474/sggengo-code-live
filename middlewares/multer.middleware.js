import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    const isImage = file.mimetype.startsWith("image/");

    let resource_type = "auto";

    if (isVideo) resource_type = "video";
    if (isImage) resource_type = "image";

    return {
      folder: "gallery",
      resource_type,
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "avi"],
      transformation: isImage
        ? [{ width: 800, height: 800, crop: "limit" }]
        : undefined,
    };
  },
});

export const upload = multer({ storage });

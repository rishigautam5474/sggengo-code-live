import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    mediaUrl: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ["image", "video"],
        required: true
    }
}, {timestamps: true})

const Gallery = mongoose.model("gallery", gallerySchema);

export default Gallery;
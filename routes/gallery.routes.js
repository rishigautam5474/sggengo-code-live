import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addGallery, deleteMedia, galleryController } from "../controllers/gallery.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.get("/", galleryController);
router.post("/add", authMiddleware(["ADMIN"]), upload.fields([{ name: "mediaUrl", maxCount: 1 }]), addGallery);
router.delete("/:id", authMiddleware(["ADMIN"]), deleteMedia);

export default router;
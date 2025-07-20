import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addMedia, deleteMedia, getAllMedia } from "../controllers/media.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { asyncWrap } from "../utils/errorHandler.js";
const router = express.Router();

router.get("/", asyncWrap(getAllMedia));
router.post("/add", authMiddleware(["ADMIN"]), upload.fields([{ name: "mediaUrl", maxCount: 1 }]), asyncWrap(addMedia));
router.delete("/:id", authMiddleware(["ADMIN"]), asyncWrap(deleteMedia));

export default router;
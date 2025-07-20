import express from "express";
import { loginAuth, logoutUser, registerAuth } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { asyncWrap } from "../utils/errorHandler.js";
const router = express.Router();

router.post("/register", asyncWrap(registerAuth));
router.post("/login", asyncWrap(loginAuth));
router.get("/logout", authMiddleware(["ADMIN"]) , logoutUser);

export default router;
import express from "express";
import { loginAuth, registerAuth } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", registerAuth);
router.post("/login", loginAuth);
// router.get("/logout", authMiddleware(["ADMIN"]) , logoutUser);

export default router;
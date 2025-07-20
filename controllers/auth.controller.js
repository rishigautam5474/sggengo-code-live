import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorHandler.js";

const registerAuth = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorResponse(400, "All fields are required"))
  }

  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return next(new ErrorResponse(400, "Email already are exists"))
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return res.status(201).json({
    error: false,
    success: true,
    message: "User signup successfully",
    user,
  });
};

const loginAuth = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

  const user = await User.findOne({email});
  if(!user) {
    return next(new ErrorResponse(404, "Please enter valid email and password"));
  }

  const isMatched = await user.comparePassword(password);
  if(!isMatched) {
    return next(new ErrorResponse(404, "Please enter valid email and password"));
  }

  const token = jwt.sign({id: user._id, name: user.name, email: user.email, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"} )

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,  // true in production (HTTPS)
    sameSite: "None",  // for cross-origin frontend/backend
    maxAge: 1000 * 60 * 60 * 1 // 1 hour
  })

  return res.status(200).json({error: false, success: true, message: "User Login Successfully"})

};

const logoutUser = async (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false
  });

  return res
    .status(200)
    .json({ success: true, error: false, message: "User logout successfully" });
};

export { registerAuth, loginAuth, logoutUser };

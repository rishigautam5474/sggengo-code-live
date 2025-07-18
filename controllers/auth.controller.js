import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerAuth = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(403)
      .json({
        error: true,
        success: false,
        message: "All fields are required",
      });
  }

  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res
      .status(400)
      .json({
        error: true,
        success: false,
        message: "Email already are exists",
      });
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

const loginAuth = async (req, res) => {
try {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(password,"email++++++++++")

  const user = await User.findOne({email});
  if(!user) {
    return res.status(404).json({error: true, success: false, message: "Please enter valid email and password"});
  }

  const isMatched = await user.comparePassword(password);
  if(!isMatched) {
    return res.status(404).json({error: true, success: false, message: "Please enter valid email and password"});
  }

  const token = jwt.sign({id: user._id, name: user.name, email: user.email, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"} )

  return res.status(200).json({error: false, success: true, message: "User Login Successfully", token, user})
} catch(error) {
  // console.log(error,"error++++++++")
  return res.status(500).json({error: true, success: false, message: error?.response?.message})
}

};

// const logoutUser = async (req, res) => {
//   await req?.session?.destroy();

//   return res
//     .status(200)
//     .json({ success: true, error: false, message: "User logout successfully" });
// };

export { registerAuth, loginAuth };

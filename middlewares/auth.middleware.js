import jwt from "jsonwebtoken";

const authMiddleware =
  (role = []) =>
  async (req, res, next) => {
    const header = await req?.header("authorization");
    // console.log(header,"header+++++++++")
    const token = header?.split(" ")[1];
    // console.log(token, "token+++++++++++++");

    if (!token) {
        return res.status(401).json({error: true, success: false, message: "User unauthorized"})
    }
    
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
    });
    
    if (!decode?.id) {
        return res.status(401).json({error: true, success: false, message: "Access Denied: Insufficient permissions"})
    }
    
    req.user = decode?.id;
    
    // if (decode.role !== role) {
        //   return next(
            //     new ErrorResponse(401, "Access Denied: Insufficient permissions")
            //   );
            // }
            
    if (role.length && !role.includes(decode.role)) {
        return res.status(401).json({error: true, success: false, message: "Access Denied: Insufficient permissions"})
    }

    next();
  };

export { authMiddleware };

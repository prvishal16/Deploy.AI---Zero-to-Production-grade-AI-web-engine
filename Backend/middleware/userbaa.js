import jwt from "jsonwebtoken";
import UserDatabase from "../model/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Replace
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserDatabase.findById(decoded.userid);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

///now any where in the mern code

//now i am going to finding the all daata for the cuurent data

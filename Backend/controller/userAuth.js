import UserDatabase from "../model/user.js";
import jwt from "jsonwebtoken";

export const GoogleAuth = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    let emailbaa = await UserDatabase.findOne({ email });
    let message;

    if (!emailbaa) {
      emailbaa = await UserDatabase.create({ name, email, avatar });
      message = "User Created Successfully";
    } else {
      message = "User Already Exists";
    }

    const token = jwt.sign(
      { userid: emailbaa._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ message, success: true });

  } catch (error) {
    return res.status(500).json({ message: `Failed to Auth: ${error}`, success: false });
  }
};



export const Logout = async (req, res) => {
  try {

    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0)
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
      success: false
    });
  }
};

//now i am going to making the middle ware only autheerized user willl going to access the page 
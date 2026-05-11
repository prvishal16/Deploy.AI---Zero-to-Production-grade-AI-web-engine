//here i am going to making the schema

import mongoose, { mongo } from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    credit: {
      type: Number,
      default: 500,
      min: 0,
    },
    plane: {
      type: String,
      enum: ["free", "price", "enterpricess"],
      default: "free",
    },
  },
  { timestamps: true },
);

const UserDatabase = mongoose.model("Userdata", User);
export default UserDatabase;

//now any user related task is completed by the help of thee UserDatabase

//now i am going to making the the authentication if the the frontend supply the data then what is the operation is going to done

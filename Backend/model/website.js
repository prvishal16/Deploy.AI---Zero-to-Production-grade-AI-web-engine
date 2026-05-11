//here i am going to making the new term of the policy

import express from "express";
import mongoose from "mongoose";
import UserDatabase from "./user.js";
const messaageschema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["ai", "user"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const websiteschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDatabase",
      required: true,
    },
    title: {
      type: String,
      default: "Untitled Website",
    },
    latestcode: {
      type: String,
      required: true,
    },
    converasation: [messaageschema],
    deployed: {
      type: Boolean,
      default: false,
    },
    deployUrl: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);
const website = mongoose.model("website", websiteschema);
export default website;

///now i am going to wrting the code for the website deploymemtn code

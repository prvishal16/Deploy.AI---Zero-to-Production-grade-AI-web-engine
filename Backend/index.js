import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieparser from "cookie-parser";
import mongoose from "mongoose";
import Databaseconnect from "./config/db.js";
import auth from "./routes/Auth.js";
import sabdata from "./routes/User.js";
import websiteRoutes from "./routes/website.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieparser());

app.use("/auth", auth);
app.use("/user", sabdata);
app.use("/website", websiteRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`this is the link http://localhost:${PORT}`);
  Databaseconnect();
});

///this is the routes of the website simply

import express from "express";
import { isAuthenticated } from "../middleware/userbaa.js";
import {
  changewebsite,
  deploywebsite,
  GenerateData,
  getbyslug,
  getingallwebsite,
  GetWebsiteById,
} from "../controller/website.js";
const websiteRoutes = express.Router();

websiteRoutes.post("/generate", isAuthenticated, GenerateData);
websiteRoutes.post("/update/:id", isAuthenticated, changewebsite);
websiteRoutes.get("/getwebsite/:id", isAuthenticated, GetWebsiteById);
websiteRoutes.get("/getall", isAuthenticated, getingallwebsite);
websiteRoutes.get("/deploy/:id", isAuthenticated, deploywebsite);
websiteRoutes.get("/getbyslug/:slug", isAuthenticated, getbyslug);
export default websiteRoutes;

//now i am going to fetching the data from the frontend to backend

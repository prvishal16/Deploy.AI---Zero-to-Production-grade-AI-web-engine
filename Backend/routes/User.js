import express from "express";
import currentUser from "../controller/userData.js";
import { isAuthenticated } from "../middleware/userbaa.js";
// import { finalresponse } from "../controller/website.js";
const sabdata = express.Router();

sabdata.get("/currentData", isAuthenticated, currentUser);
// sabdata.get("/gen", finalresponse);
export default sabdata;

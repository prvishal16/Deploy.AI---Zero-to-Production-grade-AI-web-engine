//here i am going to wrting the code for the authenin
import express from 'express';
import { GoogleAuth, Logout } from '../controller/userAuth.js';
import { isAuthenticated } from '../middleware/userbaa.js';
const auth=express.Router();
//now here  i am going to making the routes


auth.post("/login",GoogleAuth);

auth.get("/logout",isAuthenticated,Logout);
export default auth;


//now i am also going to wrting the code for the logout 
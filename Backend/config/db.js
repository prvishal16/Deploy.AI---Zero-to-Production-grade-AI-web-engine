
import mongoose, { mongo } from "mongoose";
const Databaseconnect=async (req,res)=>{
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully ");
  } catch (error) {
    console.log(`this is error from the mongodb connection ${error}`);
  }

}
 export default Databaseconnect;
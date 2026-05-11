const currentUser=async(req,res)=>{
  try {
    //here i am going to finding 
    if(!req.user){
      return res.status(400).json({message:"No Data Found",user:null});
    }

    return res.status(200).json({message:"The Current User Data",sabdata:req.user})
  } catch (error) {
    return res.status(500).json({message:"Error from the CurrentUser Data "});
  }
}

export default currentUser;

//now i am going to 
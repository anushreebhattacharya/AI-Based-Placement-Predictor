const User = require("../models/user");
const bcrypt=require("bcryptjs");

const getProfile=async(req,res)=>{
  try{
    const user=await User.findById(req.user._id).select("-password");
    if(!user){
      return res.status(404).json({
        message:"User not found"
      })
    }
    res.status(200).json(user);
  }catch(error){
    console.error("Get profile:",error);
    res.status(500).json({
      message:error.message || "Server error"
    })
  }
}

const updateProfile=async(req,res)=>{
  try{
    const user=await User.findById(req.user._id);
    if(!user){
      return res.status(400).json({
        message:"User not found"
      })
    }
    if(req.body.password){
      req.body.password=await bcrypt.hash(req.body.password,10);
    }
    const updatedUser=await User.findByIdAndUpdate(req.user._id,req.body, {new:true}).select("-password");
    res.status(200).json({
      _id:updatedUser._id,
      username:updatedUser.username,
      email:updatedUser.email,
    })
  }catch(error){
    res.status(500).json({
      message:error.message ||"server error"
    })
  }
}

module.exports={getProfile,updateProfile}
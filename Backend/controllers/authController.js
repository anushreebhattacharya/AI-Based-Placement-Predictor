const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

const registerUser= async(req,res)=>{
  try{
    const{username,email,password}=req.body;
    if(!username ||!email ||!password){
      return res.status(400).json({
        message:"All fields are required"
      })
    }
    const userExists=await User.findOne({email});
    if(userExists){
      return res.status(400).json({
        message:"User already exists"
      })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
      username,
      email,
      password:hashedPassword,
    })
    res.status(201).json({
      _id:user._id,
      username:user.username,
      email:user.email,
      token:generateToken(user._id),
    })
  }
  catch(error){
    console.error("Register user:",error);
    res.status(500).json({
      message:error.message || "Server error"
    })
  }
}

  const loginUser=async(req,res)=>{
    try{
      const {email,password}=req.body;
      if(!email || !password){
        return res.status(400).json({
          message:"All fields are required"
        })
      }
      const user=await User.findOne({email});
      if(!user){
        return res.status(400).json({
          message:"Invalid credentials"
        })
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({
          message:"Invalid Credentials"
        })
      }
      res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        token:generateToken(user._id),
      })
    }
    catch(error){
    console.error("Login user:",error);
    res.status(500).json({
      message:error.message || "server error"
    }) 
   }
  }
  
module.exports={registerUser,loginUser}
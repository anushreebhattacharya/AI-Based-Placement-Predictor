const mongoose=require("mongoose");

const predictionSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  CGPA:{
    type:Number,
    required:true,
  },
  Internships:{
    type:Number,
    required:true,
  },
  Projects:{
    type:Number,
    required:true,
  },
  WorkshopsCertifications:{
    type:Number,
    required:true,
  },
  AptitudeTestScore:{
    type:Number,
    required:true,
  },
  SoftSkillsRating:{
    type:Number,
    required:true,
  },
  ExtracurricularActivities:{
    type:String,
    required:true,
  },
  PlacementTraining:{
    type:String,
    required:true,
  },
  SSC_Marks:{
    type:Number,
    required:true,
  },
  HSC_Marks:{
    type:Number,
    required:true,
  },




  prediction:{
    type:String,
    required:true,
  },
  placement_probability:{
    type:Number,
    required:true,
  },



  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  recommendations: [{ type: String }],
},
{timestamps:true});

const predictionModel=mongoose.model('Prediction',predictionSchema);
module.exports=predictionModel;
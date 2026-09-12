const Prediction = require("../models/prediction");
const axios = require("axios");

// POST /api/predictions/predict
const predictPlacement = async (req, res) => {
  try {
    const {
      CGPA,
      Internships,
      Projects,
      Workshops_Certifications,
      AptitudeTestScore,
      SoftSkillsRating,
      ExtracurricularActivities,
      PlacementTraining,
      SSC_Marks,
      HSC_Marks,
    } = req.body;

    // Validation
    if (
      CGPA === undefined ||
      Internships === undefined ||
      Projects === undefined ||
      Workshops_Certifications === undefined ||
      AptitudeTestScore === undefined ||
      SoftSkillsRating === undefined ||
      ExtracurricularActivities === undefined ||
      PlacementTraining === undefined ||
      SSC_Marks === undefined ||
      HSC_Marks === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Call Flask API
    const response = await axios.post(
      `${process.env.ML_API_URL}/predict`,
      {
        CGPA,
        Internships,
        Projects,
        "Workshops/Certifications": Workshops_Certifications,
        AptitudeTestScore,
        SoftSkillsRating,
        ExtracurricularActivities,
        PlacementTraining,
        SSC_Marks,
        HSC_Marks,
      }
    );

    // Save prediction
    const savedPrediction = await Prediction.create({
      user: req.user._id,
      CGPA,
      Internships,
      Projects,
      WorkshopsCertifications: Workshops_Certifications, // ✅ Fixed
      AptitudeTestScore,
      SoftSkillsRating,
      ExtracurricularActivities,
      PlacementTraining,
      SSC_Marks,
      HSC_Marks,
      prediction: response.data.prediction,
      placement_probability: response.data.placement_probability, // ✅ Fixed
      strengths: response.data.strengths || [],
      weaknesses: response.data.weaknesses || [],
      recommendations: response.data.recommendations || []
    });

    res.status(201).json({
      success: true,
      prediction: savedPrediction,
      result: response.data,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Prediction service unavailable.",
    });
  }
};

// GET Prediction History
const getPredictionHistory = async (req, res) => {
  try {
    const history = await Prediction.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch prediction history.",
    });
  }
};

// GET Prediction By ID
const getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: "Prediction not found.",
      });
    }

    res.status(200).json({
      success: true,
      prediction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

// DELETE Prediction
const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: "Prediction not found.",
      });
    }

    await prediction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Prediction deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

module.exports = {
  predictPlacement,
  getPredictionHistory,
  getPredictionById,
  deletePrediction,
};
const express=require("express")
const router=express.Router()

const{predictPlacement,
  getPredictionById,
  deletePrediction}=require("../controllers/predictionController")

const { protect } = require("../middleware/authMiddleware");

// Predict Placement
router.post("/predict", protect, predictPlacement);

// Get Single Prediction by ID
router.get("/:id", protect, getPredictionById);

// Delete Prediction
router.delete("/:id", protect, deletePrediction);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getPredictionHistory,
} = require("../controllers/predictionController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getPredictionHistory);

module.exports = router;
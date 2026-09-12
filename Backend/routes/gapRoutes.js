const express = require("express");
const router = express.Router();

const {
  analyzeGap,
} = require("../controllers/gapController");

const { protect } = require("../middleware/authMiddleware");

router.post("/analyze", protect, analyzeGap);

module.exports = router;
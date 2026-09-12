const axios = require("axios");

const analyzeGap = async (req, res) => {
  try {
    const {
      cgpa,
      internships,
      projects,
      certifications,
      aptitude_score,
      communication_skill_score,
      placement_training,
      extracurricular_activities,
      ssc_marks,
      hsc_marks,
    } = req.body;

    if (
      cgpa === undefined ||
      internships === undefined ||
      projects === undefined ||
      certifications === undefined ||
      aptitude_score === undefined ||
      communication_skill_score === undefined ||
      placement_training === undefined ||
      extracurricular_activities === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const response = await axios.post(
      `${process.env.ML_API_URL}/analyze-gap`,
      {
        CGPA: cgpa,
        Internships: internships,
        Projects: projects,
        "Workshops/Certifications": certifications,
        AptitudeTestScore: aptitude_score,
        SoftSkillsRating: communication_skill_score,
        PlacementTraining: placement_training,
        ExtracurricularActivities: extracurricular_activities,
        SSC_Marks: ssc_marks !== undefined ? Number(ssc_marks) : 60,
        HSC_Marks: hsc_marks !== undefined ? Number(hsc_marks) : 60,
      }
    );

    res.status(200).json({
      success: true,
      gapAnalysis: response.data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while analyzing the gap.",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeGap,
};
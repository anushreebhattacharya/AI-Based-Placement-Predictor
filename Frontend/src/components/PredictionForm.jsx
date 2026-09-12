import React, { useState } from "react";

const PredictionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    CGPA: "",
    Internships: "",
    Projects: "",
    Workshops_Certifications: "",
    AptitudeTestScore: "",
    SoftSkillsRating: "",
    ExtracurricularActivities: "",
    PlacementTraining: "",
    SSC_Marks: "",
    HSC_Marks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse numbers for numeric fields while keeping string values where needed
    const formattedData = {
      CGPA: parseFloat(formData.CGPA),
      Internships: parseInt(formData.Internships, 10),
      Projects: parseInt(formData.Projects, 10),
      Workshops_Certifications: parseInt(formData.Workshops_Certifications, 10),
      AptitudeTestScore: parseFloat(formData.AptitudeTestScore),
      SoftSkillsRating: parseFloat(formData.SoftSkillsRating),
      ExtracurricularActivities: parseInt(formData.ExtracurricularActivities, 10) || formData.ExtracurricularActivities,
      PlacementTraining: formData.PlacementTraining,
      SSC_Marks: parseFloat(formData.SSC_Marks),
      HSC_Marks: parseFloat(formData.HSC_Marks),
    };

    if (onSubmit) {
      onSubmit(formattedData);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      {/* HEADER */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-[#0F2A35]">
          Enter Your Details
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please provide accurate information for better prediction
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* CGPA */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              CGPA
            </label>
            <input
              type="number"
              name="CGPA"
              value={formData.CGPA}
              onChange={handleChange}
              placeholder="Enter your CGPA"
              min="0"
              max="10"
              step="0.01"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>

          {/* Internships */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              Internships
            </label>
            <input
              type="number"
              name="Internships"
              value={formData.Internships}
              onChange={handleChange}
              placeholder="Number of internships"
              min="0"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>

          {/* Projects */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              Projects
            </label>
            <input
              type="number"
              name="Projects"
              value={formData.Projects}
              onChange={handleChange}
              placeholder="Number of projects"
              min="0"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>

          {/* Workshops / Certifications */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              Workshops / Certifications
            </label>
            <input
              type="number"
              name="Workshops_Certifications"
              value={formData.Workshops_Certifications}
              onChange={handleChange}
              placeholder="Number of workshops/certifications"
              min="0"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>

          {/* Aptitude Test Score */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              Aptitude Test Score
            </label>
            <input
              type="number"
              name="AptitudeTestScore"
              value={formData.AptitudeTestScore}
              onChange={handleChange}
              placeholder="Enter score (0-100)"
              min="0"
              max="100"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>

          {/* Soft Skills Rating */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              Soft Skills Rating
            </label>
            <input
              type="number"
              name="SoftSkillsRating"
              value={formData.SoftSkillsRating}
              onChange={handleChange}
              placeholder="Enter rating (0-100)"
              min="0"
              max="100"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>

          {/* Extracurricular Activities */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              Extracurricular Activities
            </label>
            <input
              type="number"
              name="ExtracurricularActivities"
              value={formData.ExtracurricularActivities}
              onChange={handleChange}
              placeholder="Enter number of activities"
              min="0"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>

          {/* Placement Training */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              Placement Training
            </label>
            <select
              name="PlacementTraining"
              value={formData.PlacementTraining}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* SSC Marks */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              SSC Marks
            </label>
            <input
              type="number"
              name="SSC_Marks"
              value={formData.SSC_Marks}
              onChange={handleChange}
              placeholder="Enter SSC marks (%)"
              min="0"
              max="100"
              step="0.01"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>

          {/* HSC Marks */}
          <div>
            <label className="block text-sm font-medium text-[#0F2A35] mb-2">
              HSC Marks
            </label>
            <input
              type="number"
              name="HSC_Marks"
              value={formData.HSC_Marks}
              onChange={handleChange}
              placeholder="Enter HSC marks (%)"
              min="0"
              max="100"
              step="0.01"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none transition focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full h-12 mt-7 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold transition duration-200 shadow-sm hover:shadow-md"
        >
          Predict My Placement
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;
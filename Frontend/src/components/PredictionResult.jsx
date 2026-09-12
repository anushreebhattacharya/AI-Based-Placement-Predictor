import React from "react";
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

const PredictionResult = ({ result }) => {
  if (!result) return null;

  // 1. Unwrap data safely regardless of API wrapper structure
  const payload = result.result || result.data || result;

  // 2. Resolve placement status safely
  const isPlaced =
    payload.prediction === "Placed" ||
    payload.prediction === 1 ||
    payload.prediction === "1" ||
    payload.placementStatus === "Placed" ||
    payload.placementStatus === "Likely to be placed";

  // 3. Resolve probability across all possible naming conventions
  const rawProbability =
    payload.placement_probability ??
    payload.placementProbability ??
    payload.probability ??
    0;

  const probability = typeof rawProbability === "number" 
    ? rawProbability.toFixed(1) 
    : rawProbability;

  // 4. Extract Gap Analysis arrays with fallbacks
  const strengths = payload.strengths || [];
  const weaknesses = payload.weaknesses || [];
  const recommendations = payload.recommendations || [];

  return (
    <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
      {/* HEADER & ICON */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {isPlaced ? (
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <CheckCircle size={36} className="text-[#0D9488]" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center">
              <AlertCircle size={36} className="text-amber-500" />
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-[#0F2A35]">Prediction Result</h2>
        <p className="text-sm text-gray-500 mt-1">
          Here is your placement prediction & career assessment
        </p>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {/* Placement Status Card */}
        <div className="bg-[#F8FAFC] rounded-xl p-5 text-center border border-gray-100 flex flex-col items-center justify-center">
          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1">
            Placement Status
          </p>
          <div className="flex items-center gap-2 mt-1">
            {isPlaced ? (
              <CheckCircle size={20} className="text-[#0D9488]" />
            ) : (
              <AlertCircle size={20} className="text-amber-500" />
            )}
            <p
              className={`text-lg font-bold ${
                isPlaced ? "text-[#0D9488]" : "text-amber-600"
              }`}
            >
              {isPlaced ? "Likely to be Placed" : "Needs Improvement"}
            </p>
          </div>
        </div>

        {/* Placement Probability Card */}
        <div className="bg-[#F8FAFC] rounded-xl p-5 text-center border border-gray-100 flex flex-col items-center justify-center">
          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1">
            Placement Probability
          </p>
          <div className="flex items-center gap-2 mt-1">
            <TrendingUp size={20} className="text-[#0D9488]" />
            <p className="text-2xl font-bold text-[#0F2A35]">
              {probability}%
            </p>
          </div>
        </div>
      </div>

      {/* SUMMARY MESSAGE */}
      <p className="text-sm text-center text-gray-500 mt-5">
        {isPlaced
          ? "Great profile! Keep refining your skills to land high-tier offers."
          : "Keep building your skills, completing projects, and refining placement readiness."}
      </p>

      {/* GAP ANALYSIS SECTIONS */}
      {(strengths.length > 0 ||
        weaknesses.length > 0 ||
        recommendations.length > 0) && (
        <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
          {/* STRENGTHS */}
          {strengths.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className="text-[#0D9488]" />
                <h3 className="text-xs font-bold text-[#0F2A35] uppercase tracking-wider">
                  Key Strengths
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {strengths.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-emerald-50/50 text-emerald-900 border border-emerald-100 px-3 py-2 rounded-lg text-sm"
                  >
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AREAS FOR IMPROVEMENT */}
          {weaknesses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-amber-500" />
                <h3 className="text-xs font-bold text-[#0F2A35] uppercase tracking-wider">
                  Areas for Improvement
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {weaknesses.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-amber-50/50 text-amber-900 border border-amber-100 px-3 py-2 rounded-lg text-sm"
                  >
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* RECOMMENDATIONS */}
          {recommendations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} className="text-blue-500" />
                <h3 className="text-xs font-bold text-[#0F2A35] uppercase tracking-wider">
                  Actionable Recommendations
                </h3>
              </div>
              <ul className="space-y-2">
                {recommendations.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-blue-50/50 text-blue-900 border border-blue-100 px-3 py-2 rounded-lg text-sm"
                  >
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionResult;
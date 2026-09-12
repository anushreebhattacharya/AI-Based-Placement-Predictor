import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import GapAnalyzer from "../components/GapAnalyzer";
import { getPredictionHistory, analyzeGap } from "../services/api";

const Gap = () => {
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGapAnalysis = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Get prediction history
        const historyResponse = await getPredictionHistory();

        const history =
          historyResponse.data?.history ||
          historyResponse.data?.predictions ||
          (Array.isArray(historyResponse.data) ? historyResponse.data : []);

        // 2. Handle empty history
        if (!history || history.length === 0) {
          setGapData(null);
          return;
        }

        const latest = history[0];

        // 3. Fallback: If latest prediction contains gap analysis
        if (latest.strengths || latest.weaknesses || latest.recommendations) {
          setGapData({
            strengths: latest.strengths || [],
            weaknesses: latest.weaknesses || [],
            recommendations: latest.recommendations || [],
          });
          return;
        }

        // 4. Construct payload for Flask backend API
        const payload = {
          CGPA: Number(latest.CGPA),
          Internships: Number(latest.Internships),
          Projects: Number(latest.Projects),
          "Workshops/Certifications": Number(
            latest["Workshops/Certifications"] ??
              latest.Workshops_Certifications ??
              latest.WorkshopsCertifications ??
              0
          ),
          AptitudeTestScore: Number(latest.AptitudeTestScore),
          SoftSkillsRating: Number(latest.SoftSkillsRating),
          ExtracurricularActivities: latest.ExtracurricularActivities,
          PlacementTraining: latest.PlacementTraining,
          SSC_Marks: Number(latest.SSC_Marks),
          HSC_Marks: Number(latest.HSC_Marks),
        };

        const gapResponse = await analyzeGap(payload);

        // 5. Store resolved payload
        const resolvedData =
          gapResponse.data?.gap ||
          gapResponse.data?.result ||
          gapResponse.data;

        setGapData(resolvedData);
      } catch (err) {
        console.error("Gap analysis error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to analyze your skill gaps."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGapAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="ml-64 min-h-screen p-6 lg:p-8">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-[#0F2A35]">Gap Analyzer</h1>
          <p className="mt-1 text-sm text-gray-500">
            Analyze your skills and get improvement suggestions
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500">Analyzing your skill gaps...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-6 text-center border border-red-100">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Empty History State */}
        {!loading && !error && !gapData && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500">
              Make a placement prediction first to analyze your gaps.
            </p>
          </div>
        )}

        {/* Gap Analyzer Component */}
        {!loading && !error && gapData && <GapAnalyzer data={gapData} />}
      </main>
    </div>
  );
};

export default Gap;
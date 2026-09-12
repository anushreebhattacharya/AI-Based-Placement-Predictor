import React from "react";
import { CheckCircle, AlertCircle, Lightbulb, Award, AlertTriangle } from "lucide-react";

const GapAnalyzer = ({ data }) => {
  if (!data) return null;

  // 1. Extract array data safely across all backend formats
  const rawItems = Array.isArray(data)
    ? data
    : data.parameters || data.gaps || data.metrics || [];

  const strengths = data.strengths || [];
  const weaknesses = data.weaknesses || [];
  const recommendations = data.recommendations || [];

  // Helper functions for scoring items
  const getStatus = (score, required) => {
    if (score >= required) return { text: "Excellent", type: "excellent" };
    if (score >= required * 0.9) return { text: "Good", type: "good" };
    return { text: "Needs Improvement", type: "warning" };
  };

  const getPercentage = (score, max) => {
    if (!max || max === 0) return 0;
    return Math.min((score / max) * 100, 100);
  };

  const getStatusStyle = (type) => {
    if (type === "excellent" || type === "good") {
      return { text: "text-[#0D9488]", bg: "bg-[#0D9488]" };
    }
    return { text: "text-orange-500", bg: "bg-orange-500" };
  };

  return (
    <div className="space-y-6">
      {/* ================= METRICS TABLE (IF AVAILABLE) ================= */}
      {rawItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-4 px-7 py-5 border-b border-gray-200 text-sm font-semibold text-[#0F2A35]">
            <div>Skill Parameter</div>
            <div>Your Score</div>
            <div>Required</div>
            <div>Status</div>
          </div>

          {rawItems.map((item, index) => {
            const score = item.score ?? 0;
            const required = item.required ?? 0;
            const max = item.max ?? 100;

            const status = getStatus(score, required);
            const styles = getStatusStyle(status.type);
            const percentage = getPercentage(score, max);

            return (
              <div
                key={index}
                className="grid grid-cols-4 items-center px-7 py-5 border-b border-gray-100 last:border-b-0"
              >
                <div className="text-sm font-semibold text-[#0F2A35]">
                  {item.name || item.parameter}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-[#0F2A35] whitespace-nowrap">
                    {score} / {max}
                  </span>
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`h-full rounded-full ${styles.bg}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm font-medium text-[#0F2A35]">
                  {required}
                </div>

                <div className="flex items-center gap-2">
                  {status.type === "warning" ? (
                    <AlertCircle size={18} className="text-orange-500 flex-shrink-0" />
                  ) : (
                    <CheckCircle size={18} className="text-[#0D9488] flex-shrink-0" />
                  )}
                  <span className={`text-sm font-semibold ${styles.text}`}>
                    {status.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= STRENGTHS & WEAKNESSES (FLASK FALLBACK) ================= */}
      {(strengths.length > 0 || weaknesses.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.length > 0 && (
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Award size={20} className="text-[#0D9488]" />
                <h3 className="text-base font-bold text-[#0F2A35]">Key Strengths</h3>
              </div>
              <ul className="space-y-2">
                {strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {weaknesses.length > 0 && (
            <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-amber-500" />
                <h3 className="text-base font-bold text-[#0F2A35]">Areas to Improve</h3>
              </div>
              <ul className="space-y-2">
                {weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-amber-900 bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ================= RECOMMENDATIONS ================= */}
      <div className="bg-[#ECFDFB] rounded-2xl border border-[#D5F5F1] p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Lightbulb size={36} className="text-[#0D9488]" strokeWidth={1.5} />
          </div>

          <div className="w-full">
            <h2 className="text-lg font-semibold text-[#0F2A35] mb-3">
              Recommendations
            </h2>

            <ul className="space-y-2 text-sm text-[#334E55]">
              {recommendations.length > 0
                ? recommendations.map((rec, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-[#0D9488] font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))
                : rawItems
                    .filter((item) => (item.score ?? 0) < (item.required ?? 0))
                    .map((item, index) => {
                      const diff = (item.required ?? 0) - (item.score ?? 0);
                      return (
                        <li key={index} className="flex gap-2">
                          <span className="text-[#0D9488] font-bold">•</span>
                          <span>
                            Improve your <strong>{item.name || item.parameter}</strong> by{" "}
                            {diff.toFixed(1)} {item.unit || ""}
                          </span>
                        </li>
                      );
                    })}

              {rawItems.length > 0 &&
                rawItems.every((item) => item.score >= item.required) &&
                recommendations.length === 0 && (
                  <li className="text-[#0D9488] font-medium">
                    Your profile meets all standard placement benchmarks!
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapAnalyzer;
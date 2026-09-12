import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  UserCircle,
  TrendingUp,
  BriefcaseBusiness,
  FolderKanban,
  History as HistoryIcon,
  ArrowRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import { getPredictionHistory } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState("Student");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPredictionHistory();

        const predictions = response.data.history || [];

        setHistory(predictions);

        // Get user name from localStorage
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);

            setUserName(
              user.name ||
                user.fullName ||
                user.username ||
                "Student"
            );
          } catch (error) {
            console.log("Unable to read stored user");
          }
        }
      } catch (error) {
        console.error("Dashboard error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =========================
  // LATEST PREDICTION
  // =========================

  const latestPrediction = history.length > 0 ? history[0] : null;

  const probability = Number(
    latestPrediction?.placement_probability ?? 0
  );

  const projects = Number(
    latestPrediction?.Projects ?? 0
  );

  const internships = Number(
    latestPrediction?.Internships ?? 0
  );

  const predictionResult =
    latestPrediction?.prediction || "No prediction";

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // TREND DATA
  // =========================

  const trendData = [...history]
    .reverse()
    .slice(-7)
    .map((item) => ({
      probability: Number(
        item.placement_probability ?? 0
      ),
      date: formatDate(item.createdAt),
    }));

  // =========================
  // SVG CHART
  // =========================

  const chartWidth = 600;
  const chartHeight = 220;

  const chartPoints = trendData.map((item, index) => {
    const x =
      trendData.length === 1
        ? chartWidth / 2
        : (index / (trendData.length - 1)) *
          chartWidth;

    const y =
      chartHeight -
      (item.probability / 100) * chartHeight;

    return {
      ...item,
      x,
      y,
    };
  });

  const linePoints = chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Sidebar />

        <main className="ml-64 min-h-screen flex items-center justify-center">
          <div className="w-9 h-9 rounded-full border-4 border-[#0D9488] border-t-transparent animate-spin"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="ml-64 min-h-screen">

        {/* =========================
            HEADER
        ========================= */}

        <header className="h-16 bg-white border-b border-gray-100 px-6 lg:px-8 flex items-center justify-between">

          <div>
            <h1 className="text-lg font-bold text-[#0F2A35]">
              Good morning, {userName} 👋
            </h1>

            <p className="text-xs text-gray-500 mt-0.5">
              Here's your placement overview
            </p>
          </div>

          <div className="flex items-center gap-5">

            <button className="relative text-gray-500 hover:text-[#0D9488] transition">
              <Bell size={19} />

              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#0D9488] rounded-full"></span>
            </button>

            <div className="flex items-center gap-2">
              <UserCircle
                size={28}
                className="text-[#0D9488]"
              />

              <span className="text-sm font-medium text-[#0F2A35]">
                {userName}
              </span>
            </div>

          </div>

        </header>

        {/* =========================
            CONTENT
        ========================= */}

        <section className="p-6 lg:p-8">

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-100 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* NO PREDICTION */}

          {!latestPrediction ? (

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">

              <TrendingUp
                size={42}
                className="mx-auto text-[#0D9488] mb-4"
              />

              <h2 className="text-xl font-bold text-[#0F2A35]">
                No prediction yet
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Make your first placement prediction to see
                your dashboard statistics.
              </p>

              <button
                onClick={() => navigate("/prediction")}
                className="mt-6 px-5 py-2.5 bg-[#0D9488] text-white rounded-lg text-sm font-medium hover:bg-[#0F766E] transition"
              >
                Make Prediction
              </button>

            </div>

          ) : (

            <>
              {/* =========================
                  STAT CARDS
              ========================= */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* PLACEMENT PROBABILITY */}

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-xs text-gray-500">
                        Placement Probability
                      </p>

                      <h2 className="text-3xl font-bold text-[#0F2A35] mt-2">
                        {probability}%
                      </h2>
                    </div>

                    <div className="relative w-14 h-14">

                      <svg
                        viewBox="0 0 36 36"
                        className="w-14 h-14 -rotate-90"
                      >

                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />

                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#0D9488"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="94.2"
                          strokeDashoffset={
                            94.2 -
                            (94.2 * probability) /
                              100
                          }
                        />

                      </svg>

                    </div>

                  </div>

                  <span className="inline-block mt-3 px-2.5 py-1 rounded-full bg-teal-50 text-[#0D9488] text-[11px] font-medium">
                    {predictionResult}
                  </span>

                </div>

                {/* PROJECTS */}

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-xs text-gray-500">
                        Projects
                      </p>

                      <h2 className="text-3xl font-bold text-[#0F2A35] mt-2">
                        {projects}
                        <span className="text-lg text-gray-400">
                          {" "} / 3
                        </span>
                      </h2>
                    </div>

                    <FolderKanban
                      size={22}
                      className="text-[#0D9488]"
                    />

                  </div>

                  <div className="mt-4 h-2 bg-gray-100 rounded-full">

                    <div
                      className="h-2 bg-[#0D9488] rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (projects / 3) * 100,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                  <p className="text-[11px] text-gray-500 mt-2">
                    {projects >= 3
                      ? "Excellent project portfolio"
                      : `${3 - projects} more project${
                          3 - projects === 1 ? "" : "s"
                        } recommended`}
                  </p>

                </div>

                {/* INTERNSHIPS */}

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-xs text-gray-500">
                        Internships
                      </p>

                      <h2 className="text-3xl font-bold text-[#0F2A35] mt-2">
                        {internships}
                        <span className="text-lg text-gray-400">
                          {" "} / 1
                        </span>
                      </h2>
                    </div>

                    <BriefcaseBusiness
                      size={22}
                      className="text-[#0D9488]"
                    />

                  </div>

                  <div className="mt-4 h-2 bg-gray-100 rounded-full">

                    <div
                      className="h-2 bg-[#0D9488] rounded-full"
                      style={{
                        width: `${Math.min(
                          internships * 100,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                  <p className="text-[11px] text-gray-500 mt-2">
                    {internships >= 1
                      ? "Internship experience added"
                      : "Consider getting an internship"}
                  </p>

                </div>

              </div>

              {/* =========================
                  LOWER CONTENT
              ========================= */}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">

                {/* TREND */}

                <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">

                  <div className="flex items-center justify-between mb-5">

                    <div>
                      <h3 className="font-semibold text-[#0F2A35]">
                        Placement Trend
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Your prediction probability over time
                      </p>
                    </div>

                    <TrendingUp
                      size={20}
                      className="text-[#0D9488]"
                    />

                  </div>

                  {trendData.length < 2 ? (

                    <div className="h-56 flex items-center justify-center text-sm text-gray-400">
                      Make more predictions to see your trend.
                    </div>

                  ) : (

                    <div className="relative h-56">

                      {/* Y AXIS */}

                      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400">

                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>

                      </div>

                      <svg
                        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                        preserveAspectRatio="none"
                        className="absolute left-10 top-0 w-[calc(100%-40px)] h-full"
                      >

                        {/* GRID */}

                        {[0, 25, 50, 75, 100].map(
                          (value) => {

                            const y =
                              chartHeight -
                              (value / 100) *
                                chartHeight;

                            return (
                              <line
                                key={value}
                                x1="0"
                                y1={y}
                                x2={chartWidth}
                                y2={y}
                                stroke="#E5E7EB"
                                strokeWidth="1"
                              />
                            );
                          }
                        )}

                        {/* LINE */}

                        <polyline
                          points={linePoints}
                          fill="none"
                          stroke="#0D9488"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* POINTS */}

                        {chartPoints.map(
                          (point, index) => (
                            <circle
                              key={index}
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="white"
                              stroke="#0D9488"
                              strokeWidth="2"
                            />
                          )
                        )}

                      </svg>

                    </div>

                  )}

                </div>

                {/* RECENT PREDICTION */}

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="font-semibold text-[#0F2A35]">
                        Recent Prediction
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Latest prediction result
                      </p>
                    </div>

                    <HistoryIcon
                      size={20}
                      className="text-[#0D9488]"
                    />

                  </div>

                  <div className="text-center mt-8">

                    <div className="text-4xl font-bold text-[#0F2A35]">
                      {probability}%
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Placement probability
                    </p>

                    <span className="inline-block mt-4 px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-xs font-medium">
                      {predictionResult}
                    </span>

                    <p className="text-xs text-gray-400 mt-4">
                      {formatDate(
                        latestPrediction.createdAt
                      )}
                    </p>

                    <button
                      onClick={() =>
                        navigate("/history")
                      }
                      className="mt-5 inline-flex items-center gap-1 text-[#0D9488] text-xs font-semibold hover:underline"
                    >
                      View History
                      <ArrowRight size={14} />
                    </button>

                  </div>

                </div>

              </div>
            </>
          )}

        </section>

      </main>
    </div>
  );
};

export default Dashboard;
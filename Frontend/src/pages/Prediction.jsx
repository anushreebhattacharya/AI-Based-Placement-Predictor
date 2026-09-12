import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";

const Prediction = () => {

  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handlePrediction = async (formData) => {

    setLoading(true);
    setError("");
    setPredictionResult(null);

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5002/api/predictions/predict",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );


      if (!response.ok) {
        throw new Error("Prediction failed");
      }


      const data = await response.json();

      console.log("Prediction result:", data);


      // Save result
      setPredictionResult(data);

    } catch (err) {

      console.error("Prediction error:", err);

      setError(
        "Unable to get prediction. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="ml-64 min-h-screen p-6 lg:p-8">

        <div className="max-w-5xl mx-auto">

          {/* ================= PREDICTION CARD ================= */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">


            {/* ================= STEPPER ================= */}

            <div className="px-8 pt-6 pb-5">

              <div className="flex items-center justify-between max-w-3xl mx-auto">


                {/* STEP 1 */}

                <div className="flex items-center flex-1">

                  <div className="flex flex-col items-center">

                    <div className="w-8 h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center text-sm font-bold">
                      1
                    </div>

                    <span className="text-xs font-semibold text-[#0F2A35] mt-2">
                      Enter Details
                    </span>

                  </div>


                  <div className="h-[2px] bg-[#0D9488] flex-1 mx-3 mt-[-18px]"></div>

                </div>


                {/* STEP 2 */}

                <div className="flex items-center flex-1">

                  <div className="flex flex-col items-center">

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        predictionResult
                          ? "bg-[#0D9488] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      2
                    </div>

                    <span
                      className={`text-xs mt-2 ${
                        predictionResult
                          ? "font-semibold text-[#0F2A35]"
                          : "text-gray-400"
                      }`}
                    >
                      Prediction
                    </span>

                  </div>


                  <div
                    className={`h-[2px] flex-1 mx-3 mt-[-18px] ${
                      predictionResult
                        ? "bg-[#0D9488]"
                        : "bg-gray-200"
                    }`}
                  ></div>

                </div>


                {/* STEP 3 */}

                <div className="flex flex-col items-center">

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      predictionResult
                        ? "bg-[#0D9488] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    3
                  </div>

                  <span
                    className={`text-xs mt-2 ${
                      predictionResult
                        ? "font-semibold text-[#0F2A35]"
                        : "text-gray-400"
                    }`}
                  >
                    Results
                  </span>

                </div>

              </div>

            </div>


            {/* ================= FORM ================= */}

            <PredictionForm
              onSubmit={handlePrediction}
            />


          </div>


          {/* ================= ERROR ================= */}

          {error && (

            <div className="mt-5 px-5 py-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">

              {error}

            </div>

          )}


          {/* ================= LOADING ================= */}

          {loading && (

            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">

              <div className="flex justify-center">

                <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0D9488] rounded-full animate-spin"></div>

              </div>

              <p className="text-sm text-gray-500 mt-4">
                Analyzing your profile...
              </p>

            </div>

          )}


          {/* ================= RESULT ================= */}

          {predictionResult && !loading && (

            <PredictionResult
              result={predictionResult}
            />

          )}

        </div>

      </main>

    </div>

  );
};

export default Prediction;
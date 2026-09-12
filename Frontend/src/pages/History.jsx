import { useEffect, useState } from "react";
import { getPredictionHistory, deletePredictionById } from "../services/api";
import Sidebar from "../components/Sidebar";
import {
  History as HistoryIcon,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch ALL prediction history
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPredictionHistory();

      setHistory(response.data.history || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to fetch prediction history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Delete prediction
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prediction?"
    );

    if (!confirmDelete) return;

    try {
      await deletePredictionById(id);

      // Remove deleted prediction from UI
      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to delete prediction."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <main className="ml-64 min-h-screen p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
              <HistoryIcon className="h-6 w-6 text-teal-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#0F2A35]">
                Prediction History
              </h1>

              <p className="text-sm text-gray-500">
                View all your previous placement predictions
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-teal-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading prediction history...</span>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>

            <button
              onClick={fetchHistory}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No history */}
        {!loading && !error && history.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <HistoryIcon className="mb-4 h-12 w-12 text-gray-300" />

            <h2 className="text-lg font-semibold text-gray-700">
              No predictions yet
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your prediction history will appear here.
            </p>
          </div>
        )}

        {/* ALL HISTORY */}
        {!loading && !error && history.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Table header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-[#0F2A35]">
                All Predictions
              </h2>

              <p className="text-sm text-gray-500">
                {history.length} prediction
                {history.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                      Result
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                      Probability
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                      CGPA
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                      Projects
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                      Internships
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item) => {
                    const isPlaced =
                      String(item.prediction).toLowerCase() ===
                      "placed";

                    return (
                      <tr
                        key={item._id}
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >
                        {/* Date */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </td>

                        {/* Result */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                              isPlaced
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {isPlaced ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}

                            {item.prediction || "Unknown"}
                          </span>
                        </td>

                        {/* Probability */}
                        <td className="px-6 py-4">
                          <span className="font-semibold text-teal-600">
                            {item.placement_probability ?? 0}%
                          </span>
                        </td>

                        {/* CGPA */}
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {item.CGPA ?? "—"}
                        </td>

                        {/* Projects */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.Projects ?? "—"}
                        </td>

                        {/* Internships */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.Internships ?? "—"}
                        </td>

                        {/* Delete */}
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              handleDelete(item._id)
                            }
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete prediction"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
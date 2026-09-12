import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "../assets/RegisterImage.jpg";
import { registerUser } from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      console.log("Submitting:", formData);

      const response = await registerUser(formData);

      console.log("Register response:", response.data);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Go to dashboard after successful registration
      navigate("/login");

    } catch (err) {
      console.error("Register error:", err);

      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Left Sidebar */}
      <div className="hidden lg:flex lg:w-1/3 bg-[#0A2229] flex-col justify-between p-10 text-white">

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#00897B] flex items-center justify-center">
            <svg
              className="w-5 h-5 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
            </svg>
          </div>

          <span className="font-semibold text-lg leading-tight">
            Placement
            <br />
            Predictor
          </span>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src={RegisterImage}
            alt="Books and Graduation Cap"
            className="w-64 mb-8 object-contain"
          />

          <p className="text-[#B2DFDB] text-lg px-4 leading-relaxed max-w-xs">
            Create your account and start your journey towards success.
          </p>
        </div>

        <div></div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create Account
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#00897B] transition text-gray-800 placeholder-gray-400 text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#00897B] transition text-gray-800 placeholder-gray-400 text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                minLength={6}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#00897B] transition text-gray-800 placeholder-gray-400 text-sm"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#00897B] hover:bg-[#00796B] disabled:bg-gray-400 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-sm"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#00897B] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
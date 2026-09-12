import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Quote } from "lucide-react";
import LoginImage from "../assets/LoginImage.jpg";
import { loginUser } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      // Call backend login API
      const response = await loginUser(formData);

      console.log("Login response:", response.data);

      // Check whether backend returned JWT token
      if (!response.data.token) {
        throw new Error("Token not received from server.");
      }

      // Save JWT token in browser
      localStorage.setItem("token", response.data.token);

      console.log(
        "Token saved:",
        localStorage.getItem("token")
      );

      // Navigate after successful login
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex lg:w-[32%] relative overflow-hidden bg-[#062A32]">

        {/* Background Image */}
        <img
          src={LoginImage}
          alt="Placement Predictor"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#062A32]/75"></div>

        {/* Left Content */}
        <div className="relative z-10 w-full p-8 flex flex-col text-white">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-[#0D9488] flex items-center justify-center">

              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>

            </div>

            <div className="leading-tight">
              <p className="font-bold text-sm">
                Placement
              </p>

              <p className="font-bold text-sm">
                Predictor
              </p>
            </div>

          </div>

          {/* Quote */}
          <div className="mt-24 max-w-xs">

            <Quote
              className="text-[#0D9488] mb-5"
              size={34}
              fill="currentColor"
            />

            <p className="text-[#D7EEEC] text-lg font-medium leading-relaxed">
              Better preparation today leads to a successful career tomorrow.
            </p>

          </div>

          <div className="flex-1"></div>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-[#172B32]">
              Welcome Back!
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Login to continue
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                <Mail size={15} />

                Email

              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  h-12
                  px-4
                  rounded-lg
                  border border-gray-200
                  bg-white
                  text-gray-800
                  text-sm
                  outline-none
                  transition
                  focus:border-[#0D9488]
                  focus:ring-2
                  focus:ring-[#0D9488]/10
                "
              />

            </div>

            {/* Password */}
            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                <Lock size={15} />

                Password

              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="
                  w-full
                  h-12
                  px-4
                  rounded-lg
                  border border-gray-200
                  bg-white
                  text-gray-800
                  text-sm
                  outline-none
                  transition
                  focus:border-[#0D9488]
                  focus:ring-2
                  focus:ring-[#0D9488]/10
                "
              />

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-12
                rounded-lg
                bg-[#0D9488]
                hover:bg-[#0F766E]
                disabled:bg-gray-400
                text-white
                font-semibold
                transition
                duration-200
                shadow-sm
                hover:shadow-md
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-7">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-[#0D9488] font-bold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;
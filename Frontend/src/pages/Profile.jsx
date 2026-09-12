import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getProfile, updateProfile } from "../services/api";

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [tempData, setTempData] = useState(formData);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch logged-in user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProfile();

        const user = response.data.user || response.data;

        const profileData = {
          username: user.username || "",
          email: user.email || "",
          password: "",
        };

        setFormData(profileData);
        setTempData(profileData);

      } catch (err) {
        console.error("Profile fetch error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
          "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value,
    });
  };

  // Start editing
  const handleEdit = () => {
    setTempData({
      ...formData,
      password: "",
    });

    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setTempData({
      ...formData,
      password: "",
    });

    setError("");
    setSuccess("");
    setIsEditing(false);
  };

  // Save profile
  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updateData = {
        username: tempData.username,
        email: tempData.email,
      };

      // Only send password if user entered a new one
      if (tempData.password.trim() !== "") {
        updateData.password = tempData.password;
      }

      const response = await updateProfile(updateData);

      const updatedUser =
        response.data.user || response.data;

      const updatedData = {
        username: updatedUser.username || tempData.username,
        email: updatedUser.email || tempData.email,
        password: "",
      };

      setFormData(updatedData);
      setTempData(updatedData);

      setIsEditing(false);
      setSuccess("Profile updated successfully.");

    } catch (err) {
      console.error("Profile update error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Sidebar />

        <main className="ml-64 min-h-screen p-8 md:p-10 flex items-center justify-center">
          <p className="text-gray-500">
            Loading profile...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8 md:p-10">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F2A35]">
            My Profile
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your personal information
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-5 py-4">
            <p className="text-sm text-green-600">
              {success}
            </p>
          </div>
        )}

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">

            {/* Avatar */}
            <div className="flex justify-center mb-5">
              <div className="w-28 h-28 rounded-full bg-[#0D9488] flex items-center justify-center">
                <span className="text-5xl font-semibold text-white">
                  {formData.username
                    ? formData.username.charAt(0).toUpperCase()
                    : "U"}
                </span>
              </div>
            </div>

            {/* Username */}
            <h2 className="text-2xl font-bold text-[#0F2A35] text-center">
              {formData.username || "User"}
            </h2>

            {/* Email */}
            <p className="text-gray-500 text-center mt-2 break-all">
              {formData.email}
            </p>

            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="w-full mt-7 bg-[#0D9488] hover:bg-[#0F766E] text-white font-medium py-3 rounded-xl transition"
              >
                Edit Profile
              </button>
            )}

            {/* Save / Cancel */}
            {isEditing && (
              <div className="flex gap-3 mt-7">

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-[#0D9488] hover:bg-[#0F766E] disabled:bg-gray-400 text-white font-medium py-3 rounded-xl transition"
                >
                  {saving ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-xl transition"
                >
                  Cancel
                </button>

              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full mt-4 border border-red-300 text-red-600 hover:bg-red-50 font-medium py-3 rounded-xl transition"
            >
              Logout
            </button>

          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-7">

            <h2 className="text-xl font-semibold text-[#0F2A35] mb-7">
              Personal Information
            </h2>

            {/* Username */}
            <div className="pb-5 mb-5 border-b border-gray-200">

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Username
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={tempData.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                />
              ) : (
                <p className="text-lg text-[#0F2A35]">
                  {formData.username}
                </p>
              )}

            </div>

            {/* Email */}
            <div className="pb-5 mb-5 border-b border-gray-200">

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Email
              </label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                />
              ) : (
                <p className="text-lg text-[#0F2A35] break-all">
                  {formData.email}
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Password
              </label>

              {isEditing ? (
                <>
                  <input
                    type="password"
                    name="password"
                    value={tempData.password}
                    onChange={handleChange}
                    placeholder="Enter new password (optional)"
                    minLength={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    Leave blank if you don't want to change your password.
                  </p>
                </>
              ) : (
                <p className="text-lg tracking-widest text-gray-400">
                  ••••••••
                </p>
              )}

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Profile;
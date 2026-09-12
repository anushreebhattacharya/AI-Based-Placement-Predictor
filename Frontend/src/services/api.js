import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api",
});

// Attach JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auth
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);

// Profile
export const getProfile = () =>
  API.get("/user/profile");

export const updateProfile = (data) =>
  API.put("/user/profile", data);

// Prediction
export const handlePrediction = (data) =>
  API.post("/predictions/predict", data);

export const getPredictionHistory = () =>
  API.get("/history");

export const getPredictionById = (id) =>
  API.get(`/prediction/${id}`);

export const deletePredictionById = (id) =>
  API.delete(`/prediction/${id}`);

// Gap Analyzer
export const analyzeGap = (data) =>
  API.post("/gap/analyze", data);

export default API;
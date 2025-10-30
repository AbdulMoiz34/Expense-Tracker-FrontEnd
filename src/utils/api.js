import axios from "axios";

const API_BASE_URL = "https://expense-tracker-backend-aujw9a3f1-abdulmoiz34s-projects.vercel.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth");
    const auth = raw ? JSON.parse(raw) : null;
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  } catch { }
  return config;
});

export default api;




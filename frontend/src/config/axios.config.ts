import axios from "axios";
const { VITE_BASE_URL, VITE_LOCAL_URL, VITE_APP_MODE } = import.meta.env;
const api = axios.create({
  baseURL: VITE_APP_MODE === "production" ? VITE_BASE_URL : VITE_LOCAL_URL,
  withCredentials: true,
});

export default api;

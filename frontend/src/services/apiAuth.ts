import axios from "axios";
import api from "../config/axios.config";
// import type { IUser } from "../interfaces/user";

export async function userLogin(userData: { email: string; password: string }) {
  try {
    const { data } = await api.post("/auth/login", userData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to login");
    }
  }
}

export async function getMe() {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch user data");
    }
  }
}

export async function userLogout() {
  try {
    const { data } = await api.post("/auth/logout");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to logout");
    }
  }
}

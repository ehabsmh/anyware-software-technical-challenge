import axios from "axios";
import api from "../config/axios.config";
import type { ISemester } from "../interfaces/semester";

export async function getSemesters() {
  try {
    const { data }: { data: ISemester[] } = await api.get("/semesters");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to fetch semesters."
      );
    }
  }
}

export async function getCurrentSemester() {
  try {
    const { data }: { data: ISemester } = await api.get("/semesters/current");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to fetch current semester."
      );
    }
  }
}

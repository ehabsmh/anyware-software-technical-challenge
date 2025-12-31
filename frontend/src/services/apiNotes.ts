import axios from "axios";
import api from "../config/axios.config";
import type { ILessonNote } from "../interfaces/note";

export async function fetchLessonNote(lessonId: string) {
  try {
    const { data } = await api.get<ILessonNote>(`/notes/${lessonId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to enroll in course."
      );
    }

    throw new Error("An unexpected error occurred.");
  }
}

export async function saveLessonNote(lessonId: string, content: string) {
  try {
    const { data } = await api.patch(`/notes/${lessonId}`, { content });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to enroll in course."
      );
    }

    throw new Error("An unexpected error occurred.");
  }
}

import axios from "axios";
import api from "../config/axios.config";
import type { IQuizSubmission, IQuizUpcoming } from "../interfaces/quiz";

export async function fetchUpcomingQuizzes() {
  const { data }: { data: IQuizUpcoming[] } = await api.get(
    "/quizzes/upcoming"
  );
  return data;
}

export async function fetchQuizById(id: string) {
  const { data }: { data: IQuizUpcoming } = await api.get(`/quizzes/${id}`);
  return data;
}
export async function submitQuiz(id: string, answers: number[]) {
  try {
    const { data }: { data: IQuizSubmission } = await api.post(
      `/quizzes/${id}/submit`,
      { answers }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);

      throw new Error(error.response.data.error || "Failed to submit quiz");
    }
  }
}

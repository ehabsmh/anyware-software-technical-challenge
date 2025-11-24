import axios from "axios";
import api from "../config/axios.config";
import type {
  IInstructorQuiz,
  IQuiz,
  IQuizSubmission,
  IQuizUpcoming,
} from "../interfaces/quiz";

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

export async function fetchInstructorQuizzes(page: number, limit: number) {
  try {
    const { data }: { data: IInstructorQuiz } = await api.get(
      "/quizzes/instructor",
      {
        params: { page, limit },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
    }
  }
}

export async function fetchQuizQuestions(id: string) {
  try {
    const { data }: { data: IQuiz["questions"] } = await api.get(
      `/quizzes/${id}/questions`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
    }
  }
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

export async function createQuiz(quizData: IQuiz) {
  try {
    const { data }: { data: IQuiz } = await api.post("/quizzes", quizData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create quiz");
    }
  }
}

export async function updateQuizInfo(id: string, quizData: Partial<IQuiz>) {
  try {
    const { data }: { data: IQuiz } = await api.patch(
      `/quizzes/${id}`,
      quizData
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to update quiz info"
      );
    }
  }
}

export async function updateQuizQuestions(
  id: string,
  questions: IQuiz["questions"]
) {
  try {
    const { data }: { data: IQuiz } = await api.patch(
      `/quizzes/${id}/questions`,
      { questions }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to update quiz questions"
      );
    }
  }
}

export async function deleteQuiz(id: string) {
  try {
    await api.delete(`/quizzes/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to delete quiz");
    }
  }
}

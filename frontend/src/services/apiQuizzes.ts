import axios from "axios";
import api from "../config/axios.config";
import type {
  ICorrectQuiz,
  IInstructorQuiz,
  IQuiz,
  IQuizSubmission,
  IQuizSubmissionPopulated,
  IQuizUpcoming,
  ISubmitQuiz,
} from "../interfaces/quiz";

export async function fetchUpcomingQuizzes() {
  const { data }: { data: IQuizUpcoming[] } = await api.get(
    "/quizzes/upcoming"
  );
  return data;
}

export async function fetchQuizById(id: string) {
  try {
    const { data }: { data: IQuizUpcoming } = await api.get(`/quizzes/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error || "Failed to fetch quiz.");
    }
  }
}

export async function fetchInstructorQuizzes(options: {
  page?: number;
  limit?: number;
  topic?: string;
  course?: string;
}) {
  const { page = 1, limit = 5, topic = "", course = "" } = options;
  try {
    const { data }: { data: IInstructorQuiz } = await api.get(
      "/quizzes/instructor",
      {
        params: { page, limit, topic, course },
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

export async function fetchStudentSubmissions({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}) {
  try {
    const {
      data,
    }: {
      data: {
        items: IQuizSubmissionPopulated[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    } = await api.get(`/quizzes/submissions/student`, {
      params: { page, limit },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to fetch quiz submissions."
      );
    }
  }
}

export async function fetchQuizSubmissionById(id: string) {
  try {
    const { data }: { data: IQuizSubmissionPopulated } = await api.get(
      `/quizzes/submissions/${id}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to fetch quiz submission."
      );
    }
  }
}

export async function fetchQuizSubmissions(
  quizId: string,
  page = 1,
  limit = 5
) {
  try {
    const {
      data,
    }: {
      data: {
        items: IQuizSubmissionPopulated[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    } = await api.get(`/quizzes/${quizId}/submissions`, {
      params: { page, limit },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to fetch quiz submissions."
      );
    }
  }
}

export async function submitQuiz(payload: ISubmitQuiz) {
  try {
    const { data }: { data: IQuizSubmission } = await api.post(
      `/quizzes/submissions`,
      payload
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
    console.log("data");
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

export async function correctQuizSubmission(payload: ICorrectQuiz) {
  try {
    const { data }: { data: IQuizSubmission } = await api.patch(
      "/quizzes/submissions/corrections",
      payload
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to correct quiz submission"
      );
    }
  }
}

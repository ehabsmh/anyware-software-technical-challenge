import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ICorrectQuiz,
  IQuiz,
  IQuizSubmissionPopulated,
  IQuizUpcoming,
  ISubmitQuiz,
} from "../interfaces/quiz";
import {
  correctQuizSubmission,
  createQuiz,
  deleteQuiz,
  fetchInstructorQuizzes,
  fetchQuizById,
  fetchQuizSubmissionById,
  fetchQuizSubmissions,
  fetchStudentSubmissions,
  fetchUpcomingQuizzes,
  submitQuiz,
  updateQuizInfo,
  updateQuizQuestions,
} from "../services/apiQuizzes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useUpcomingQuizzes() {
  return useQuery({
    queryKey: ["upcoming-quizzes"],
    queryFn: () => fetchUpcomingQuizzes(),
  });
}

export function useInstructorQuizzes(options: {
  page?: number;
  limit?: number;
  topic?: string;
  course?: string;
}) {
  return useQuery({
    queryKey: [
      "quizzes",
      options.page,
      options.limit,
      options.topic,
      options.course,
    ],
    queryFn: () => fetchInstructorQuizzes(options),
  });
}

export function useQuiz(id: string, review?: boolean) {
  return useQuery<IQuizSubmissionPopulated | IQuizUpcoming | undefined, Error>({
    queryKey: [review ? "quizSubmissions" : "quiz", id],
    queryFn: () => {
      if (review) {
        return fetchQuizSubmissionById(id);
      }
      return fetchQuizById(id);
    },
  });
}

export function useCreateQuiz() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (quizData: IQuiz) => createQuiz(quizData),
    onSuccess: (newQuiz) => {
      qc.invalidateQueries({ queryKey: ["quizzes"] });
      qc.setQueryData(["quiz", newQuiz?._id], newQuiz);
      toast.success("Quiz created successfully!");
      navigate("/instructor/quizzes/manage");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Failed to create quiz");
    },
  });
}

export function useUpdateQuizInfo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; quizData: Partial<IQuiz> }) =>
      updateQuizInfo(data.id, data.quizData),
    onSuccess: (updatedQuiz) => {
      qc.invalidateQueries({ queryKey: ["quizzes"] });
      qc.setQueryData(["quiz", updatedQuiz?._id], updatedQuiz);
      toast.success("Quiz updated successfully!");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Failed to update quiz info");
    },
  });
}

export function useUpdateQuizQuestions() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { id: string; questions: IQuiz["questions"] }) =>
      updateQuizQuestions(data.id, data.questions),
    onSuccess: (updatedQuiz) => {
      qc.invalidateQueries({ queryKey: ["quizzes"] });
      qc.setQueryData(["quiz", updatedQuiz?._id], updatedQuiz);
      toast.success("Quiz questions updated successfully!");
      navigate("/instructor/quizzes/manage");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Failed to update quiz questions");
    },
  });
}

export function useDeleteQuiz() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteQuiz(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quizzes"] });
      toast.success("Quiz deleted successfully!");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Failed to delete quiz");
    },
  });
}

export function useStudentSubmissions({
  page = 1,
  limit = 5,
}: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ["studentSubmissions", page, limit],
    queryFn: () => fetchStudentSubmissions({ page, limit }),
  });
}

export function useSubmitQuiz() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ISubmitQuiz) => submitQuiz(payload),
    onSuccess: (newSubmission) => {
      qc.invalidateQueries({ queryKey: ["studentSubmissions"] });
      qc.setQueryData(
        ["studentSubmissions", newSubmission?._id],
        newSubmission
      );

      navigate(`/student/submitted-quizzes/${newSubmission?._id}`);

      toast.success("Quiz submitted successfully!");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Failed to submit quiz");
    },
  });
}

export function useQuizSubmissions(quizId: string, page = 1, limit = 5) {
  return useQuery({
    queryKey: [
      "quizSubmissions",
      `quiz-id:${quizId}`,
      `page:${page}`,
      `limit:${limit}`,
    ],
    queryFn: () => fetchQuizSubmissions(quizId, page, limit),
  });
}

export function useCorrectQuiz() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ICorrectQuiz) => correctQuizSubmission(data),
    onSuccess: (correctedSubmission) => {
      qc.invalidateQueries({ queryKey: ["quizSubmissions"] });
      toast.success("Quiz corrected successfully!");
      navigate(
        `/instructor/quizzes/${correctedSubmission?.quizId}/submissions`
      );
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Failed to correct quiz submission");
    },
  });
}

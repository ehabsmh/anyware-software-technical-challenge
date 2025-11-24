import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IQuiz } from "../interfaces/quiz";
import {
  createQuiz,
  deleteQuiz,
  fetchInstructorQuizzes,
  updateQuizInfo,
  updateQuizQuestions,
} from "../services/apiQuizzes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useInstructorQuizzes(page: number, limit: number) {
  return useQuery({
    queryKey: ["quizzes", page, limit],
    queryFn: () => fetchInstructorQuizzes(page, limit),
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

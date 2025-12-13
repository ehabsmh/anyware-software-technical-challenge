/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourseLesson,
  deleteCourseLesson,
  fetchCourseLessons,
  fetchLessonById,
  updateCourseLesson,
} from "../services/apiCourseLessons";
import { useNavigate } from "react-router-dom";
import type {
  ICreateCourseLessonPayload,
  IUpdateCourseLessonPayload,
} from "../interfaces/courseLesson";
import { toast } from "sonner";

export function useCourseLessons(courseId: string) {
  return useQuery({
    queryKey: ["courseLessons", courseId],
    queryFn: () => fetchCourseLessons(courseId),
    enabled: !!courseId,
  });
}

export function useCourseLesson(lessonId: string) {
  return useQuery({
    queryKey: ["courseLesson", lessonId],
    queryFn: () => fetchLessonById(lessonId),
    enabled: !!lessonId,
  });
}

export function useCreateCourseLesson() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: ICreateCourseLessonPayload) =>
      createCourseLesson(payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["courseLessons", data?.course] });
      navigate(`/instructor/courses/my-courses/${data?.course}`);
    },
    onError: (error: any) => {
      if (error.type !== "validation") {
        toast.error(error.message);
      }
    },
  });
}

export function useUpdateCourseLesson(id: string) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: IUpdateCourseLessonPayload) =>
      updateCourseLesson(id, payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["courseLessons", data?.course] });
      navigate(`/instructor/courses/my-courses/${data?.course}`);
    },
    onError: (error: any) => {
      if (error.type !== "validation") {
        toast.error(error.message);
      }
    },
  });
}

export function useDeleteCourseLesson() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCourseLesson(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courseLessons"] });
      toast.success("Lesson deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}

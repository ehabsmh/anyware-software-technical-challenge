/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse,
} from "../services/apiCourses";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const coursesKey = (semesterId?: string) => ["courses", semesterId ?? "all"];

export function useCourses(
  semesterId: string,
  name?: string,
  page = 1,
  limit = 8
) {
  return useQuery({
    queryKey: [...coursesKey(semesterId), name, page, limit],
    queryFn: () => getCourses(semesterId, name, page, limit),
    enabled: !!semesterId,
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
}

export function useCreateCourse() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (payload: Parameters<typeof createCourse>[0]) =>
      createCourse(payload),
    onSuccess: (result, variables) => {
      qc.invalidateQueries({
        queryKey: [...coursesKey(variables.semester)],
      });

      if (!result) return;
      qc.setQueryData(["course", result.course._id], result.course);
      toast.success(t("createCoursePage.successfulCreationMessage"));
      navigate("/instructor/courses/my-courses");
    },
    onError: (error: any) => {
      if (error.type !== "validation") {
        toast.error(error.message);
      }
    },
  });
}

type UpdateCourseType = {
  id: Parameters<typeof updateCourse>[0];
  payload: Parameters<typeof updateCourse>[1];
};

export function useUpdateCourse() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateCourseType) =>
      updateCourse(id, payload),
    onSuccess: (updatedCourse, variables) => {
      qc.invalidateQueries({
        queryKey: [...coursesKey(variables.payload.semester)],
      });
      qc.setQueryData(["course", updatedCourse?._id], updatedCourse);
      toast.success(t("createCoursePage.successfulEditMessage"));
      navigate("/instructor/courses/my-courses");
    },
    onError: (error: any) => {
      if (error.type !== "validation") {
        toast.error(error.message);
      }
    },
  });
}

export function useDeleteCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: (deletedCourse) => {
      qc.invalidateQueries({
        queryKey: [...coursesKey(deletedCourse?.course.semester)],
      });
      toast.success("Course has been deleted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourse,
  deleteCourse,
  enrollInCourse,
  getCourseById,
  getCourses,
  getEnrolledCoursesIds,
  updateCourse,
} from "../services/apiCourses";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/hooks";

const coursesKey = (semesterId?: string) => [
  "courses",
  semesterId ? `sem-${semesterId}` : "sem-all",
];

type useCoursesProps = {
  semesterId: string;
  name?: string;
  page?: number;
  limit?: number;
  enrolledOnly?: boolean;
};

export function useCourses({
  semesterId,
  name,
  page = 1,
  limit = 8,
  enrolledOnly,
}: useCoursesProps) {
  const { role } = useAppSelector((state) => state.user);

  return useQuery({
    queryKey: [
      ...coursesKey(semesterId),
      name,
      page,
      limit,
      enrolledOnly ? "enrolled" : "all",
    ],
    queryFn: () =>
      getCourses(
        role === "student"
          ? { semesterId, name, page, limit, enrolledOnly }
          : { semesterId, name, page, limit, enrolledOnly: false }
      ),
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

export function useGetEnrolledCoursesIds(semesterId: string) {
  return useQuery({
    queryKey: [
      "enrolled-courses-ids",
      `${semesterId ? `sem-${semesterId}` : "all"}`,
    ],
    queryFn: () => getEnrolledCoursesIds(semesterId),
  });
}

export function useEnrollInCourse() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (variables: Parameters<typeof enrollInCourse>[0]) =>
      enrollInCourse(variables),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: ["enrolled-courses-ids", `sem-${variables.semesterId}`],
      });
      toast.success("Enrolled in course successfully!");
      navigate(`/student/courses/${variables.courseId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

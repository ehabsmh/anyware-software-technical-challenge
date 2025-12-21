import { useQuery } from "@tanstack/react-query";
import { getCurrentSemester, getSemesters } from "../services/apiSemesters";
import type { ISemester, ISemesterCourses } from "../interfaces/semester";

// overloads
export function useSemesters(params: {
  includeCourses: true;
}): ReturnType<typeof useQuery<ISemesterCourses[]>>;

export function useSemesters(params?: {
  includeCourses?: false;
}): ReturnType<typeof useQuery<ISemester[]>>;

// implementation
export function useSemesters(params: { includeCourses?: boolean } = {}) {
  const includeCourses = params.includeCourses === true;

  return useQuery<ISemesterCourses[] | ISemester[]>({
    queryKey: ["semesters", includeCourses ? "withCourses" : "withoutCourses"],
    queryFn: () =>
      includeCourses
        ? getSemesters({ includeCourses: true })
        : getSemesters({ includeCourses: false }),
  });
}

export function useCurrentSemester() {
  return useQuery({
    queryKey: ["currentSemester"],
    queryFn: () => getCurrentSemester(),
  });
}

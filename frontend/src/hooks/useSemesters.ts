import { useQuery } from "@tanstack/react-query";
import { getCurrentSemester, getSemesters } from "../services/apiSemesters";

export function useSemesters({ includeCourses = false } = {}) {
  return useQuery({
    queryKey: ["semesters"],
    queryFn: () => getSemesters(includeCourses),
  });
}

export function useCurrentSemester() {
  return useQuery({
    queryKey: ["currentSemester"],
    queryFn: () => getCurrentSemester(),
  });
}

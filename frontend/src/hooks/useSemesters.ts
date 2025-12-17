import { useQuery } from "@tanstack/react-query";
import { getCurrentSemester, getSemesters } from "../services/apiSemesters";

export function useSemesters() {
  return useQuery({
    queryKey: ["semesters"],
    queryFn: () => getSemesters(),
  });
}

export function useCurrentSemester() {
  return useQuery({
    queryKey: ["currentSemester"],
    queryFn: () => getCurrentSemester(),
  });
}

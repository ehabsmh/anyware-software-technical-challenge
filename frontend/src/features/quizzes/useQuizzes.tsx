import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingQuizzes } from "../../services/apiQuizzes";

export function useUpcomingQuizzes() {
  return useQuery({
    queryKey: ["upcoming-quizzes"],
    queryFn: () => fetchUpcomingQuizzes(),
  });
}

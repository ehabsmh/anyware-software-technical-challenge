import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLessonNote, saveLessonNote } from "../services/apiNotes";

export function useLessonNote(lessonId: string) {
  return useQuery({
    queryKey: ["lessonNote", `lesson-${lessonId}`],
    queryFn: async () => fetchLessonNote(lessonId),
    enabled: !!lessonId,
  });
}

export function useSaveContent() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lessonId,
      content,
    }: {
      lessonId: string;
      content: string;
    }) => saveLessonNote(lessonId, content),

    onSuccess: (_, { lessonId }) => {
      qc.invalidateQueries({
        queryKey: ["lessonNote", `lesson-${lessonId}`],
      });
    },
  });
}

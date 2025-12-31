import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import type { ICourseLesson } from "../../interfaces/courseLesson";
import { format } from "date-fns";
import { useLessonNote, useSaveContent } from "../../hooks/useNotes";
import { useDebounce } from "use-debounce";

function LessonNote({ lesson }: { lesson: ICourseLesson }) {
  const [contentState, setContentState] = useState({
    lessonId: lesson._id,
    content: "",
  });

  const [debouncedValue] = useDebounce(contentState, 3000);

  const { data } = useLessonNote(lesson._id);

  const { mutate: saveContent, isPending, isSuccess } = useSaveContent();

  const lessonNote = data?.data;

  const updatedAt = lessonNote?.updatedAt
    ? format(new Date(lessonNote.updatedAt), "PPpp")
    : null;

  // Update content when lessonNote changes
  useEffect(() => {
    if (lessonNote) {
      setContentState({
        lessonId: lessonNote._id,
        content: lessonNote.content,
      });
    }
  }, [lessonNote]);

  // Save content when debouncedValue changes
  useEffect(() => {
    if (!debouncedValue.content) return;
    if (debouncedValue.lessonId !== lesson._id) return;

    saveContent(debouncedValue);
  }, [debouncedValue, saveContent]);

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        p: 2.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          mb: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {lesson.order}. {lesson.title}
        </Typography>

        {isPending ? (
          <Typography variant="caption" color="text.secondary">
            Saving...
          </Typography>
        ) : isSuccess || updatedAt ? (
          <Typography variant="caption" color="text.secondary">
            {updatedAt && `Last updated · ${updatedAt}`}
          </Typography>
        ) : null}
      </Box>

      <Box
        component="textarea"
        value={contentState.content}
        onChange={(e) =>
          setContentState({
            lessonId: lesson._id,
            content: e.target.value,
          })
        }
        placeholder="Write your notes for this lesson..."
        sx={{
          width: "100%",
          minHeight: 180,
          resize: "vertical",
          border: "none",
          outline: "none",
          fontSize: 15,
          lineHeight: 1.7,
          fontFamily: "inherit",
          color: "text.primary",
          backgroundColor: "transparent",

          "&::placeholder": {
            color: "text.secondary",
          },
        }}
      />
    </Paper>
  );
}

export default LessonNote;

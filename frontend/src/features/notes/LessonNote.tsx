import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import type { ICourseLesson } from "../../interfaces/courseLesson";
import { format } from "date-fns";
import { useLessonNote, useSaveContent } from "../../hooks/useNotes";
import { useDebounce } from "use-debounce";
import { useTranslation } from "react-i18next";
import useLanguage from "../../hooks/useLanguage";
import { enUS } from "date-fns/locale/en-US";
import { arSA } from "date-fns/locale/ar-SA";

const localesMap = {
  en: enUS,
  ar: arSA,
};

function LessonNote({ lesson }: { lesson: ICourseLesson }) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [contentState, setContentState] = useState({
    lessonId: lesson._id,
    content: "",
  });

  const [debouncedValue] = useDebounce(contentState, 3000);

  const { data } = useLessonNote(lesson._id);

  const { mutate: saveContent, isPending, isSuccess } = useSaveContent();

  const lessonNote = data?.data;

  const updatedAt = lessonNote?.updatedAt
    ? format(new Date(lessonNote.updatedAt), "PPpp", {
        locale: localesMap[language],
      })
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
        placeholder={t("courseLessons.courseLesson.notePlaceholderText")}
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
      {isPending ? (
        <Typography variant="caption" color="text.secondary">
          {t("courseLessons.courseLesson.savingNoteText")}
        </Typography>
      ) : isSuccess || updatedAt ? (
        <Typography variant="caption" color="text.secondary">
          {updatedAt &&
            `${t(
              "courseLessons.courseLesson.noteUpdatedAtText"
            )} · ${updatedAt}`}
        </Typography>
      ) : null}
    </Paper>
  );
}

export default LessonNote;

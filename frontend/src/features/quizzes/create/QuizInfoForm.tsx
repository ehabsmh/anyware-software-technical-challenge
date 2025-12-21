import { Box, Button, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSemesters } from "../../../hooks/useSemesters";
import FormSelect from "../../../ui/FormSelect";
import type { ISemesterCourses } from "../../../interfaces/semester";

function QuizInfoForm({
  onNext,
  editMode,
}: {
  onNext: () => void;
  editMode?: boolean;
}) {
  const { t } = useTranslation();

  const {
    register,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const semesterId = watch("semester") || "";

  const { data: semesters, isLoading: isSemestersLoading } = useSemesters({
    includeCourses: true,
  });

  const courses = semesters?.find((s) => s._id === semesterId)?.courses || [];

  // Handle Next button with validation
  async function handleNext() {
    const isValid = await trigger([
      "semester",
      "course",
      "topic",
      "dueDate",
      "timeLimitInMinutes",
      "totalPoints",
    ]);

    if (!isValid) return;

    onNext();
  }

  return (
    <>
      {!editMode && !isSemestersLoading && (
        <FormSelect
          name="semester"
          label={t("createQuizInfo.semesterLabel")}
          options={semesters as ISemesterCourses[]}
          getOptionValue={(s) => s._id}
          getOptionLabel={(s) => s.name}
        />
      )}

      {!editMode && semesterId && (
        <FormSelect
          name="course"
          label={t("createQuizInfo.courseLabel")}
          options={courses as ISemesterCourses["courses"]}
          getOptionValue={(c) => c._id}
          getOptionLabel={(c) => c.name}
          getOptionAvatar={(c) => c.image}
        />
      )}

      <TextField
        label={t("createQuizInfo.topicInputLabel")}
        {...register("topic", {
          required: "Topic is required",
          maxLength: {
            value: 100,
            message: "Topic cannot exceed 100 characters",
          },
        })}
        error={!!errors.topic}
        helperText={errors.topic ? String(errors.topic.message) : ""}
        sx={{ width: "100%" }}
      />

      <TextField
        type="date"
        {...register("dueDate", {
          required: "Date is required",
          valueAsDate: true,
        })}
        error={!!errors.dueDate}
        helperText={errors.dueDate ? String(errors.dueDate.message) : ""}
      />

      <Box className="md:flex-row flex flex-col md:gap-6 gap-4">
        <TextField
          type="number"
          label={t("createQuizInfo.timeLimitInputLabel")}
          {...register("timeLimitInMinutes", {
            required: "Time limit is required",
            valueAsNumber: true,
            max: {
              value: 180,
              message: "Time limit cannot exceed 180 minutes",
            },
          })}
          error={!!errors.timeLimitInMinutes}
          helperText={
            errors.timeLimitInMinutes
              ? String(errors.timeLimitInMinutes.message)
              : ""
          }
        />

        <TextField
          type="number"
          label={t("createQuizInfo.totalPointsInputLabel")}
          {...register("totalPoints", {
            required: "Quiz total points is required",
            valueAsNumber: true,
          })}
          error={!!errors.totalPoints}
          helperText={
            errors.totalPoints ? String(errors.totalPoints.message) : ""
          }
        />
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 2,
          py: 1.2,
          fontWeight: 600,
          background:
            "linear-gradient(to right, var(--color-gradient-1), var(--color-gradient-2))",
          transition: "all 0.4s ease",
          "&:hover": {
            opacity: 0.9,
            background:
              "linear-gradient(to right, var(--color-gradient-2), var(--color-gradient-1))",
          },
        }}
        onClick={handleNext}
      >
        {t("createQuizInfo.buttonNext")}
      </Button>
    </>
  );
}

export default QuizInfoForm;

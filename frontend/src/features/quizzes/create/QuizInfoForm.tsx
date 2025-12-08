import { Avatar, Box, Button, MenuItem, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getSemesters } from "../../../services/apiSemesters";
import { useEffect, useState } from "react";
import { useCourses } from "../../../hooks/useCourses";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

function QuizInfoForm({
  onNext,
  editMode,
}: {
  onNext: () => void;
  editMode?: boolean;
}) {
  const { t } = useTranslation();
  const { data: semesters } = useQuery({
    queryKey: ["semesters"],
    queryFn: getSemesters,
  });

  const [chosenSemesterId, setChosenSemesterId] = useState("");

  const { data } = useCourses(chosenSemesterId);
  const courses = data?.data.items;

  const {
    register,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  // Handle Next with validation
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

  // Set initial chosenSemesterId if form already hold values
  useEffect(() => {
    const semester = getValues("semester");
    if (semester) {
      setChosenSemesterId(semester);
    }
  }, [getValues]);

  return (
    <>
      {!editMode && (
        <Controller
          name="semester"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label={t("createQuizInfo.semesterLabel")}
              fullWidth
              onChange={(e) => {
                field.onChange(e.target.value);
                setChosenSemesterId(e.target.value);
              }}
              value={field.value || ""}
              error={!!errors.semester}
              helperText={
                errors.semester ? String(errors.semester.message) : ""
              }
            >
              <MenuItem value="">Select semester</MenuItem>

              {semesters?.map((sem) => (
                <MenuItem key={sem._id} value={sem._id}>
                  {sem.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}

      {!editMode && chosenSemesterId && (
        <Controller
          name="course"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label={t("createQuizInfo.courseLabel")}
              fullWidth
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors.course}
              helperText={errors.course ? String(errors.course.message) : ""}
            >
              <MenuItem value="">Select course</MenuItem>

              {courses?.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={course.image}
                      alt=""
                      sx={{ borderRadius: 0 }}
                    />
                    <p>{course.name}</p>
                  </div>
                </MenuItem>
              ))}
            </TextField>
          )}
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

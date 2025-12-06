import { Avatar, Box, Button, MenuItem, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getSemesters } from "../../../services/apiSemesters";
import { useEffect, useState } from "react";
import { useCourses } from "../../../hooks/useCourses";
import { Controller, useFormContext } from "react-hook-form";

function QuizInfoForm({
  onNext,
  editMode,
}: {
  onNext: () => void;
  editMode?: boolean;
}) {
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
              label="Semester"
              fullWidth
              onChange={(e) => {
                field.onChange(e.target.value);
                setChosenSemesterId(e.target.value);
              }}
              value={field.value || ""}
              error={!!errors.semester}
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
              label="Course"
              fullWidth
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors.course}
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
        label="Topic"
        {...register("topic", { required: "Topic is required" })}
        error={!!errors.topic}
        sx={{ width: "100%" }}
      />

      <TextField
        type="date"
        {...register("dueDate", {
          required: "Date is required",
          valueAsDate: true,
        })}
        error={!!errors.dueDate}
      />

      <Box className="md:flex-row flex flex-col md:gap-6 gap-4">
        <TextField
          type="number"
          label="Time limit in minutes"
          {...register("timeLimitInMinutes", {
            required: "Time limit is required",
            valueAsNumber: true,
          })}
          error={!!errors.timeLimitInMinutes}
        />

        <TextField
          type="number"
          label="Total Points"
          {...register("totalPoints", {
            required: "Quiz total points is required",
            valueAsNumber: true,
          })}
          error={!!errors.totalPoints}
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
        Next
      </Button>
    </>
  );
}

export default QuizInfoForm;

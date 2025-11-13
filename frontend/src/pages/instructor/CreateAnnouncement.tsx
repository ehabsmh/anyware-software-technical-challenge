import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { getSemesters } from "../../services/apiSemesters";
import { useCourses } from "../../hooks/useCourses";
import type { IAnnouncement } from "../../interfaces/announcement";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useAnnouncement,
  useCreateAnnouncement,
} from "../../hooks/useAnnouncements";
import { useQuery } from "@tanstack/react-query";

// For Edit mode
import { useParams } from "react-router";

function CreateAnnouncement({ editMode }: { editMode?: boolean }) {
  const { data: semesters } = useQuery({
    queryKey: ["semesters"],
    queryFn: getSemesters,
  });

  const { id } = useParams();

  const { data: announcement } = useAnnouncement(id!);

  const [chosenSemesterId, setChosenSemesterId] = useState<string>("");

  const { data } = useCourses(chosenSemesterId);
  const courses = data?.data.items;

  const { mutate: createAnnouncement, isPending } = useCreateAnnouncement();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Partial<IAnnouncement>>();

  const onSubmit = async (data: Partial<IAnnouncement>) => {
    try {
      if (editMode) {
        console.log("Implemenet Edit mode");
      } else {
        // add announcement
        createAnnouncement(data);
      }
    } catch (error) {
      toast.error((error as Error).message || "Failed to create course.");
    }
  };

  useEffect(() => {
    if (editMode && announcement) {
      reset({
        title: announcement.title,
        content: announcement.content,
        semester: announcement.semester._id,
        course: announcement.course._id,
      });
    }
  }, [editMode, announcement, reset]);

  useEffect(() => {
    if (announcement) {
      setChosenSemesterId(announcement.semester._id);
    }
  }, [announcement]);

  return (
    <Box className="bg-main xl:w-4/7 lg:w-4/5 mx-auto p-4">
      <Card
        sx={{
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            sx={{
              background:
                "linear-gradient(to right, var(--color-gradient-1), var(--color-gradient-2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            {editMode ? "Edit Announcement" : "New Announcement"}
          </Typography>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Announcement Title */}
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              focused={editMode}
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            {/* Description */}
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              focused={editMode}
              {...register("content", { required: "Content is required" })}
              error={!!errors.content}
              helperText={errors.content?.message}
            />

            {/* Semester */}
            <TextField
              select
              label="Semester"
              fullWidth
              focused={editMode}
              value={chosenSemesterId || watch("semester") || ""}
              {...register("semester", { required: "Semester is required" })}
              error={!!errors.semester}
              helperText={errors.semester?.message}
              onChange={(e) => setChosenSemesterId(e.target.value)}
            >
              <MenuItem value="">Select semester</MenuItem>
              {semesters?.map((sem) => (
                <MenuItem key={sem._id} value={sem._id}>
                  {sem.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Course */}
            {chosenSemesterId && (
              <TextField
                select
                label="Course"
                fullWidth
                focused={editMode}
                value={watch("course") || ""}
                {...register("course", { required: "Course is required" })}
                error={!!errors.course}
                helperText={errors.course?.message}
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

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 600,
                background:
                  "linear-gradient(to right, var(--color-gradient-1), var(--color-gradient-2))",
                "&:hover": {
                  opacity: 0.9,
                  background:
                    "linear-gradient(to right, var(--color-gradient-2), var(--color-gradient-1))",
                },
              }}
            >
              {isPending ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : editMode ? (
                "Update Announcement"
              ) : (
                "Create Announcement"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateAnnouncement;

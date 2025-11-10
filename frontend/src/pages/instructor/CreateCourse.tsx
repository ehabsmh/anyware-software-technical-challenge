import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { CloudUpload } from "@mui/icons-material";
import { toast } from "sonner";
import { getSemesters } from "../../services/apiSemesters";
import {
  useCourse,
  useCreateCourse,
  useUpdateCourse,
} from "../../hooks/useCourses";
import { useParams } from "react-router-dom";

export interface CourseFormValues {
  name: string;
  description: string;
  semester: string;
  image: File | string | null;
}

function CreateCourse({ editMode }: { editMode?: boolean }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [semesters, setSemesters] = useState<
    Array<{ _id: string; name: string }>
  >([]);

  const { id } = useParams();
  const { data: courseData } = useCourse(id!);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<CourseFormValues>({
    defaultValues: {
      image: null,
      semester:
        typeof courseData?.semester === "object"
          ? courseData.semester._id
          : courseData?.semester || "",
    },
  });

  const { mutate: addCourse, isPending } = useCreateCourse();
  const { mutate: updateCourse } = useUpdateCourse();

  const onSubmit = async (data: CourseFormValues) => {
    console.log(data);

    try {
      if (editMode && id) {
        updateCourse({ id, payload: data });
      } else {
        addCourse(data);
      }
    } catch (error) {
      toast.error((error as Error).message || "Failed to create course.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file, { shouldDirty: true });
    }
  };

  useEffect(() => {
    getSemesters().then((data) => setSemesters(data));
  }, []);

  useEffect(() => {
    console.log("courseData:", courseData);

    if (editMode && courseData) {
      reset({
        name: courseData.name,
        description: courseData.description,
        semester: courseData.semester._id,
        image: courseData.image,
      });
      setPreview(courseData.image);
    }
  }, [editMode, courseData, reset]);

  if (editMode && !courseData) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }
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
            {editMode ? "Edit Course" : "New Course"}
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Course Name */}
            <TextField
              label="Course Name"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Course name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            {/* Description */}
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description should be at least 10 characters",
                },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            {/* Semester */}
            <TextField
              select
              label="Semester"
              fullWidth
              value={watch("semester") || ""}
              {...register("semester", { required: "Semester is required" })}
              error={!!errors.semester}
              helperText={errors.semester?.message}
            >
              <MenuItem value="">Select semester</MenuItem>

              {semesters.map((sem) => (
                <MenuItem key={sem._id} value={sem._id}>
                  {sem.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Image Upload */}
            <Box className="flex flex-col items-center gap-2">
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                sx={{
                  borderColor: "var(--color-gradient-1)",
                  color: "var(--color-gradient-1)",
                  "&:hover": {
                    borderColor: "var(--color-gradient-2)",
                    color: "var(--color-gradient-2)",
                  },
                }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              {preview && (
                <Avatar
                  src={preview}
                  alt="Preview"
                  sx={{ width: 100, height: 100, borderRadius: "12px" }}
                />
              )}
              {errors.image && (
                <Typography color="error" fontSize={13}>
                  {errors.image.message}
                </Typography>
              )}
            </Box>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              disabled={isPending || !isDirty}
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
                <CircularProgress size={22} color="inherit" />
              ) : editMode ? (
                "Edit Course"
              ) : (
                "Create Course"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateCourse;

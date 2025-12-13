import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import type { ISemester } from "../../interfaces/semester";
import type { IValidationError } from "../../interfaces/validationError";
import { useTranslation } from "react-i18next";
import Form from "../../ui/Form";

export interface CourseFormValues {
  name: string;
  description: string;
  semester: string;
  image: File | string | null;
}

function CreateCourse({ editMode }: { editMode?: boolean }) {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [semesters, setSemesters] = useState<ISemester[]>([]);

  const { id } = useParams();
  const { data: courseData } = useCourse(id!);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors, isDirty },
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
    try {
      if (editMode && id) {
        updateCourse(
          { id, payload: data },
          {
            onError: (error) => {
              if (error.type === "validation") {
                const validationError = error as IValidationError;

                validationError.errors.forEach((err) => {
                  setError(err.field as keyof CourseFormValues, {
                    message: err.message,
                  });
                });
              }
            },
          }
        );
      } else {
        addCourse(data, {
          onError: (error) => {
            if (error.type === "validation") {
              const validationError = error as IValidationError;

              validationError.errors.forEach((err) => {
                setError(err.field as keyof CourseFormValues, {
                  message: err.message,
                });
              });
            }
          },
        });
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
    getSemesters().then((data) => setSemesters(data ?? []));
  }, []);

  useEffect(() => {
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
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title={
        editMode
          ? t("createCoursePage.titleEditCourse")
          : t("createCoursePage.titleNewCourse")
      }
    >
      {/* Course Name */}
      <TextField
        label={t("createCoursePage.nameInputLabel")}
        variant="outlined"
        fullWidth
        {...register("name", { required: "Course name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      {/* Description */}
      <TextField
        label={t("createCoursePage.descriptionInputLabel")}
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
        label={t("createCoursePage.semesterSelectLabel")}
        fullWidth
        value={watch("semester") || ""}
        {...register("semester", { required: "Semester is required" })}
        error={!!errors.semester}
        helperText={errors.semester?.message}
      >
        <MenuItem value="">
          {t("createCoursePage.semesterSelectLabel")}
        </MenuItem>

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
          {t("createCoursePage.imageUploadLabel")}
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
          t("createCoursePage.submitButtonTextEdit")
        ) : (
          t("createCoursePage.submitButtonTextCreate")
        )}
      </Button>
    </Form>
  );
}

export default CreateCourse;

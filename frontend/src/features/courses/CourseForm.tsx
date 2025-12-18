import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Form from "../../ui/Form";
import { useSemesters } from "../../hooks/useSemesters";
import { useTranslation } from "react-i18next";
import type {
  CourseFormValues,
  ICoursePopulated,
} from "../../interfaces/course";
import { CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Avatar,
} from "@mui/material";

type CourseFormProps = {
  onSubmit: (data: CourseFormValues) => void;
  isSubmitting: boolean;
  editMode?: boolean;
  courseData?: ICoursePopulated;
};

function CourseForm({
  onSubmit,
  isSubmitting,
  editMode,
  courseData,
}: CourseFormProps) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useFormContext<CourseFormValues>();

  const { data: semesters } = useSemesters();

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file, { shouldDirty: true });
    }
  };

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

  useEffect(() => {
    return () => {
      // Revoke the data uri to avoid memory leaks
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

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
        slotProps={{ inputLabel: { shrink: editMode ? true : undefined } }}
        variant="outlined"
        fullWidth
        {...register("name", { required: "Course name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      {/* Description */}
      <TextField
        label={t("createCoursePage.descriptionInputLabel")}
        slotProps={{ inputLabel: { shrink: editMode ? true : undefined } }}
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
        slotProps={{ inputLabel: { shrink: editMode ? true : undefined } }}
        fullWidth
        value={watch("semester") || ""}
        {...register("semester", { required: "Semester is required" })}
        error={!!errors.semester}
        helperText={errors.semester?.message}
      >
        <MenuItem value="">
          {t("createCoursePage.semesterSelectLabel")}
        </MenuItem>

        {semesters?.map((sem) => (
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
        disabled={isSubmitting || !isDirty}
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
        {isSubmitting ? (
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

export default CourseForm;

import { useFormContext } from "react-hook-form";
import Form from "../../ui/Form";
import { useSemesters } from "../../hooks/useSemesters";
import { useTranslation } from "react-i18next";
import type {
  CourseFormValues,
  ICoursePopulated,
} from "../../interfaces/course";
import { Button, TextField, CircularProgress } from "@mui/material";
import FormSelect from "../../ui/FormSelect";
import type { ISemester } from "../../interfaces/semester";
import ImageUpload from "../../ui/ImageUpload";

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
    formState: { errors, isDirty },
  } = useFormContext<CourseFormValues>();

  const { data: semesters } = useSemesters();

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
      <FormSelect
        name="semester"
        label={t("createCoursePage.semesterSelectLabel")}
        options={semesters as ISemester[]}
        getOptionLabel={(semester) => semester.name}
        getOptionValue={(semester) => semester._id}
      />

      {/* Image Upload */}
      <ImageUpload image={courseData?.image} />

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

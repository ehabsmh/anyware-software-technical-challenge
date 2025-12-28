import { Button, TextField, CircularProgress } from "@mui/material";
import type {
  IAnnouncement,
  IAnnouncementPopulated,
} from "../../interfaces/announcement";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Form from "../../ui/Form";
import { useSemesters } from "../../hooks/useSemesters";
import FormSelect from "../../ui/FormSelect";

type AnnouncementFormProps = {
  onSubmit: (data: Partial<IAnnouncement>) => void;
  isSubmitting: boolean;
  editMode?: boolean;
  announcement?: IAnnouncementPopulated;
};

function AnnouncementForm({
  onSubmit,
  isSubmitting,
  editMode,
}: AnnouncementFormProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<Partial<IAnnouncement>>();

  const { data: semesters, isLoading: isSemestersLoading } = useSemesters({
    includeCourses: true,
  });

  const semesterId = watch("semester");
  const semester = semesters?.find((sem) => sem._id === semesterId);

  return (
    <Form
      title={editMode ? "Edit Announcement" : "New Announcement"}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Announcement Title */}
      <TextField
        label={t("createAnnouncementPage.titleInputLabel")}
        slotProps={{ inputLabel: { shrink: editMode ? true : undefined } }}
        variant="outlined"
        fullWidth
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      {/* Description */}
      <TextField
        label={t("createAnnouncementPage.contentInputLabel")}
        slotProps={{ inputLabel: { shrink: editMode ? true : undefined } }}
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        {...register("content", { required: "Content is required" })}
        error={!!errors.content}
        helperText={errors.content?.message}
      />

      {/* Semester */}
      {!isSemestersLoading && (
        <FormSelect
          name="semester"
          label={t("createAnnouncementPage.semesterSelectLabel")}
          options={semesters ?? []}
          getOptionLabel={(semester) => semester.name}
          getOptionValue={(semester) => semester._id}
        />
      )}

      {semesterId && (
        <FormSelect
          name="course"
          label={t("createAnnouncementPage.courseSelectLabel")}
          options={semester?.courses ?? []}
          getOptionValue={(course) => course._id}
          getOptionLabel={(course) => course.name}
          getOptionAvatar={(course) => course.image}
        />
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
        {isSubmitting ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : editMode ? (
          t("createAnnouncementPage.submitButtonTextEdit")
        ) : (
          t("createAnnouncementPage.submitButtonTextCreate")
        )}
      </Button>
    </Form>
  );
}

export default AnnouncementForm;

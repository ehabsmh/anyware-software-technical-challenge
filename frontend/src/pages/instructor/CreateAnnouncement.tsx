import { useEffect, useState } from "react";
import {
  Button,
  TextField,
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
import type { IValidationError } from "../../interfaces/validationError";
import { useTranslation } from "react-i18next";
import Form from "../../ui/Form";

function CreateAnnouncement({ editMode }: { editMode?: boolean }) {
  const { t } = useTranslation();
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
    setError,
    formState: { errors },
  } = useForm<Partial<IAnnouncement>>();

  const onSubmit = async (data: Partial<IAnnouncement>) => {
    try {
      if (editMode) {
        console.log("Implemenet Edit mode");
      } else {
        // add announcement
        createAnnouncement(data, {
          onError: (error) => {
            if (error.type === "validation") {
              const validationError = error as IValidationError;

              validationError.errors.forEach((err) => {
                setError(err.field as keyof IAnnouncement, {
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

  if (editMode && !id) {
    return <div>Invalid edit request</div>;
  }

  return (
    <Form
      title={editMode ? "Edit Announcement" : "New Announcement"}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Announcement Title */}
      <TextField
        label={t("createAnnouncementPage.titleInputLabel")}
        variant="outlined"
        fullWidth
        focused={editMode}
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      {/* Description */}
      <TextField
        label={t("createAnnouncementPage.contentInputLabel")}
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
        label={t("createAnnouncementPage.semesterSelectLabel")}
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
          label={t("createAnnouncementPage.courseSelectLabel")}
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
                <Avatar src={course.image} alt="" sx={{ borderRadius: 0 }} />
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
          t("createAnnouncementPage.submitButtonTextEdit")
        ) : (
          t("createAnnouncementPage.submitButtonTextCreate")
        )}
      </Button>
    </Form>
  );
}

export default CreateAnnouncement;

import { useFieldArray, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import type {
  ICreateCourseLessonPayload,
  IUpdateCourseLessonPayload,
} from "../../interfaces/courseLesson";
import {
  TextField,
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  useCourseLesson,
  useCreateCourseLesson,
  useUpdateCourseLesson,
} from "../../hooks/useCourseLessons";
import { useEffect, useState } from "react";
import type { IValidationError } from "../../interfaces/validationError";
import { useTranslation } from "react-i18next";

function CreateCourseLesson({ editMode = false }: { editMode?: boolean }) {
  const { t } = useTranslation();

  const { courseId, lessonId } = useParams();
  const [videoType, setVideoType] = useState<"url" | "file">("url");
  const { data: courseLesson } = useCourseLesson(lessonId!, courseId!);

  const defaultValuesCreate = {
    course: courseId!,
    title: "",
    content: "",
    video: undefined,
    resources: [],
  };
  const defaultValuesEdit = {
    _id: lessonId!,
    title: courseLesson?.title || "",
    content: courseLesson?.content || "",
    resources: courseLesson?.resources || [],
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<ICreateCourseLessonPayload | IUpdateCourseLessonPayload>({
    defaultValues: editMode ? defaultValuesEdit : defaultValuesCreate,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "resources",
  });

  const { mutate: createLesson, isPending: isCreating } =
    useCreateCourseLesson();
  const { mutate: updateLesson, isPending: isUpdating } = useUpdateCourseLesson(
    lessonId || ""
  );

  function onSubmit(
    data: ICreateCourseLessonPayload | IUpdateCourseLessonPayload
  ) {
    if (!editMode) {
      const dataCreate = data as ICreateCourseLessonPayload;
      if (videoType === "file") {
        const video = dataCreate.video as FileList;
        if (video && video.length > 0) {
          dataCreate.video = video[0];
        }
      }

      createLesson(dataCreate, {
        onError: (error) => {
          if (error.type === "validation") {
            const validationError = error as IValidationError;

            validationError.errors.forEach((err) => {
              setError(err.field as keyof ICreateCourseLessonPayload, {
                message: err.message,
              });
            });
          }
        },
      });
    }

    if (editMode) {
      const dataUpdate = data as IUpdateCourseLessonPayload;

      updateLesson(dataUpdate, {
        onError: (error) => {
          if (error.type === "validation") {
            const validationError = error as IValidationError;

            validationError.errors.forEach((err) => {
              setError(err.field as keyof ICreateCourseLessonPayload, {
                message: err.message,
              });
            });
          }
        },
      });
    }
  }

  useEffect(() => {
    if (editMode && courseLesson) {
      reset({
        _id: lessonId!,
        title: courseLesson.title,
        content: courseLesson.content,
        resources: courseLesson.resources,
      });
    }
  }, [courseLesson, editMode, lessonId, reset]);

  return (
    <>
      <Form
        title={
          editMode
            ? t("courseLessons.lessonCreateForm.titleEditLesson")
            : t("courseLessons.lessonCreateForm.titleAddLesson")
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <TextField
          focused={editMode}
          label={t("courseLessons.lessonCreateForm.lessonTitleInputLabel")}
          variant="outlined"
          fullWidth
          {...register("title", { required: "Lesson title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        {/* Content */}
        <TextField
          focused={editMode}
          label={t("courseLessons.lessonCreateForm.lessonContentInputLabel")}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          {...register("content", { required: "Lesson content is required" })}
          error={!!errors.content}
          helperText={errors.content?.message}
        />

        {/* Upload video */}
        {editMode ? null : (
          <Box mt={2}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  {t("courseLessons.lessonCreateForm.lessonVideoTypeLabel")}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="url"
                  name="radio-buttons-group"
                  onChange={(e) =>
                    setVideoType(e.target.value as "url" | "file")
                  }
                >
                  <FormControlLabel
                    value="url"
                    control={<Radio />}
                    label={t(
                      "courseLessons.lessonCreateForm.lessonVideoUrlInputLabel"
                    )}
                  />
                  <FormControlLabel
                    value="file"
                    control={<Radio />}
                    label={t(
                      "courseLessons.lessonCreateForm.lessonVideoUploadLabel"
                    )}
                  />
                </RadioGroup>
              </FormControl>

              {videoType === "file" ? (
                <>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ alignSelf: "start" }}
                  >
                    {t("courseLessons.lessonCreateForm.lessonVideoUploadLabel")}
                    <input
                      type="file"
                      hidden
                      accept="video/*"
                      {...register("video", { required: "Video is required" })}
                    />
                  </Button>

                  <Typography variant="body2" color="text.secondary">
                    {watch("video") && (watch("video") as FileList).length > 0
                      ? (watch("video") as FileList)[0].name
                      : t("courseLessons.lessonCreateForm.noVideoSelectedText")}
                  </Typography>
                </>
              ) : (
                <TextField
                  label={t(
                    "courseLessons.lessonCreateForm.lessonVideoUrlInputLabel"
                  )}
                  variant="outlined"
                  fullWidth
                  {...register("video", { required: "Video url is required" })}
                  error={!!errors.video}
                  helperText={errors.video?.message}
                />
              )}

              {/* Error */}
              {errors.video && (
                <Typography color="error" fontSize={14}>
                  {errors.video.message}
                </Typography>
              )}
            </Paper>
          </Box>
        )}

        {/* Resources Section */}
        <Box mt={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {t("courseLessons.courseContent.addLessonButtonText")}
            </Typography>

            <Button
              startIcon={<Add />}
              variant="outlined"
              onClick={() => append({ name: "", url: "" })}
            >
              {t("courseLessons.lessonCreateForm.lessonAddResourceButtonText")}
            </Button>
          </Box>

          {/* Resource Fields */}
          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            {fields.map((field, index) => (
              <Paper
                key={field.id}
                elevation={2}
                sx={{ p: 2, borderRadius: 2 }}
              >
                <Box display="flex" gap={2} alignItems="center">
                  <TextField
                    label={t(
                      "courseLessons.lessonCreateForm.lessonResourceNameInputLabel"
                    )}
                    variant="outlined"
                    fullWidth
                    {...register(`resources.${index}.name` as const, {
                      required: "Resource name is required",
                    })}
                    error={!!errors.resources?.[index]?.name}
                    helperText={errors.resources?.[index]?.name?.message}
                  />

                  <TextField
                    label={t(
                      "courseLessons.lessonCreateForm.lessonResourceUrlInputLabel"
                    )}
                    variant="outlined"
                    fullWidth
                    {...register(`resources.${index}.url` as const, {
                      required: "Resource URL is required",
                    })}
                    error={!!errors.resources?.[index]?.url}
                    helperText={errors.resources?.[index]?.url?.message}
                  />

                  <IconButton color="error" onClick={() => remove(index)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Paper>
            ))}

            {fields.length === 0 && (
              <Typography color="text.secondary" fontSize={14}>
                {t("courseLessons.lessonCreateForm.emptyResourcesListText")}
              </Typography>
            )}
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isCreating || isUpdating}
        >
          {isCreating || isUpdating ? (
            <CircularProgress size={24} color="inherit" />
          ) : editMode ? (
            "Update Lesson"
          ) : (
            "Create Lesson"
          )}
        </Button>
      </Form>
    </>
  );
}

export default CreateCourseLesson;

import z from "zod";

export const CreateLessonSchema = z.object({
  course: z.string().length(24, "Course ID must be 24 characters long"),
  title: z.string().max(70, "Title must be at most 70 characters long"),
  content: z.string().max(1000, "Content must be at most 1000 characters long"),
  video: z.url("Video must be a valid URL").optional(),
  resources: z
    .array(
      z.object({
        name: z
          .string()
          .max(100, "Resource name must be at most 100 characters long"),
        url: z.url("Resource URL must be a valid URL"),
      })
    )
    .optional(),
  order: z
    .number()
    .min(1, "Order must be at least 1")
    .max(200, "Order must be at most 200")
    .optional(),
});

export const UpdateLessonSchema = z.object({
  title: z.string().max(70, "Title must be at most 70 characters long"),
  content: z.string().max(500, "Content must be at most 500 characters long"),
  resources: z
    .array(
      z.object({
        name: z
          .string()
          .max(100, "Resource name must be at most 100 characters long"),
        url: z.url("Resource URL must be a valid URL"),
      })
    )
    .optional(),
});

export type CreateLessonSchemaType = z.infer<typeof CreateLessonSchema>;
export type UpdateLessonSchemaType = z.infer<typeof UpdateLessonSchema>;

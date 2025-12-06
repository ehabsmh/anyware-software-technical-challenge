import z from "zod";

export const CreateCourseSchema = z.object({
  name: z.string().max(100, "Course name must be at most 100 characters long"),
  description: z
    .string()
    .max(1000, "Description must be at most 1000 characters long"),
  semester: z.string().length(24, "Semester ID must be a valid ID"),
});

export type CreateCourseType = z.infer<typeof CreateCourseSchema>;

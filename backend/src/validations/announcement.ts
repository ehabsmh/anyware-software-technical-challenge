import z from "zod";

export const CreateAnnouncementSchema = z.object({
  title: z.string().max(100, "Title must be at most 100 characters long"),
  content: z.string().max(2000, "Content must be at most 2000 characters long"),
  course: z.string().length(24, "Course ID must be a valid ID"),
  semester: z.string().length(24, "Semester ID must be a valid ID"),
});

export type CreateAnnouncementType = z.infer<typeof CreateAnnouncementSchema>;

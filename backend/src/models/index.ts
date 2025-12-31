/* Centralize models to avoid "Schema hasn't been registered" errors when populating. */

import Course from "./course";
import Semester from "./semester";
import Announcement from "./announcement";
import Quiz from "./quiz";
import User from "./user";
import Enrollment from "./enrollment";
import Note from "./note";
import { QuizSubmission } from "./quiz";

export {
  Course,
  Semester,
  Announcement,
  Quiz,
  User,
  QuizSubmission,
  Enrollment,
  Note,
};

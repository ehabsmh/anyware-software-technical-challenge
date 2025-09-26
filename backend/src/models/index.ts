/* Centralize models to avoid "Schema hasn't been registered" errors when populating. */

import Course from "./course";
import Semester from "./semester";
import Announcement from "./announcement";
import Quiz from "./quiz";

export { Course, Semester, Announcement, Quiz };

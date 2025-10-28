/* Centralize models to avoid "Schema hasn't been registered" errors when populating. */

import Course from "./course";
import Semester from "./semester";
import Announcement from "./announcement";
import Quiz from "./quiz";
import User from "./user";

export { Course, Semester, Announcement, Quiz, User };

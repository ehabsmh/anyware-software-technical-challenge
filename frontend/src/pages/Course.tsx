import { useParams } from "react-router-dom";
import CourseContent from "../features/courses/CourseContent";
import CourseLesson from "../features/courses/CourseLesson";
import { useCourseLessons } from "../hooks/useCourseLessons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Course() {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const { data: courseLessons, isLoading } = useCourseLessons(id!);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => setOpen(newOpen);

  useEffect(() => {
    if (courseLessons && courseLessons?.lessons.length > 0) {
      setSelectedLessonId(courseLessons.lessons[0]._id);
    }
  }, [courseLessons]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!courseLessons) {
    return <div>No lessons found.</div>;
  }

  return (
    <div
      className={`flex gap-8 overflow-y-auto h-[calc(100vh-86px)] ${
        i18n.language === "en" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <CourseContent
        lessons={courseLessons.lessons}
        selectedLessonId={selectedLessonId}
        onSelect={setSelectedLessonId}
        open={open}
        toggleDrawer={toggleDrawer}
      />
      <CourseLesson
        selectedLessonId={selectedLessonId}
        toggleDrawer={toggleDrawer}
        courseOverview={courseLessons.courseDetails}
      />
    </div>
  );
}

export default Course;

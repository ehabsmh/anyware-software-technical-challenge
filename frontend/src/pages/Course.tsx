import { useParams } from "react-router-dom";
import CourseContent from "../features/courses/CourseContent";
import CourseLesson from "../features/courses/CourseLesson";
import { useCourseLessons } from "../hooks/useCourseLessons";
import { useEffect, useState } from "react";
import CourseContentSkeleton from "../skeletons/CourseContentSkeleton";
import CourseLessonSkeleton from "../skeletons/CourseLessonSkeleton";

function Course() {
  const { id } = useParams();
  const { data: courseLessons, isLoading } = useCourseLessons(id!);

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => setOpenDrawer(newOpen);

  useEffect(() => {
    if (!courseLessons) return;

    if (!selectedLessonId && courseLessons?.lessons.length > 0) {
      setSelectedLessonId(courseLessons.lessons[0]._id);
    }
  }, [courseLessons, selectedLessonId]);
  if (isLoading) {
    return (
      <div className="flex gap-8 overflow-y-auto h-[calc(100vh-86px)]">
        <CourseContentSkeleton />
        <CourseLessonSkeleton />
      </div>
    );
  }

  if (!courseLessons) {
    return <div>No lessons found.</div>;
  }

  return (
    <div className="flex gap-8 overflow-y-auto h-[calc(100vh-86px)]">
      <CourseContent
        lessons={courseLessons.lessons}
        selectedLessonId={selectedLessonId}
        onSelect={setSelectedLessonId}
        openDrawer={openDrawer}
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

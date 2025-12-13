import { useParams } from "react-router-dom";
import CourseContent from "../features/courses/CourseContent";
import CourseLesson from "../features/courses/CourseLesson";
import { useCourseLessons } from "../hooks/useCourseLessons";
import { useEffect, useState } from "react";

function Course() {
  const { id } = useParams();
  const { data: courseLessons, isLoading } = useCourseLessons(id!);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

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
    <div className="flex gap-8 overflow-y-auto h-[calc(100vh-86px)]">
      <CourseContent
        lessons={courseLessons.lessons}
        selectedLessonId={selectedLessonId}
        onSelect={setSelectedLessonId}
      />
      <CourseLesson selectedLessonId={selectedLessonId} />
    </div>
  );
}

export default Course;

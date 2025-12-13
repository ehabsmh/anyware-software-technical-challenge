import { Button, List, ListItem, ListItemText } from "@mui/material";
import type { ICourseLessonPopulated } from "../../interfaces/courseLesson";
import { Delete, EditNote } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteCourseLesson } from "../../hooks/useCourseLessons";
import { showAlert } from "../../utils/helpers";

type CourseContentProps = {
  lessons: ICourseLessonPopulated["lessons"];
  selectedLessonId?: string | null;
  onSelect?: (lessonId: string) => void;
};

function CourseContent({
  lessons,
  selectedLessonId,
  onSelect,
}: CourseContentProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: deleteLesson } = useDeleteCourseLesson();
  return (
    <nav className="bg-white h-screen w-[28rem] text-black overflow-y-auto flex flex-col p-4 shadow-lg ">
      <div className="flex gap-3">
        <Button
          variant="outlined"
          className="w-full mb-4 border-gradient-2! text-gradient-1! font-bold"
          onClick={() => navigate(`/instructor/courses/${id}/add-lesson`)}
        >
          Add Lesson
        </Button>
      </div>
      <List className="space-y-3">
        <h3 className="font-bold text-xl p-3">Course Content</h3>

        {lessons.map((lesson) => (
          <ListItem
            key={lesson._id}
            className={`relative mt-7 ${
              lesson._id !== selectedLessonId
                ? "hover:font-bold hover:text-gradient-1 cursor-pointer"
                : ""
            }`}
            onClick={() => onSelect && onSelect(lesson._id)}
            sx={{
              background:
                lesson._id === selectedLessonId
                  ? "linear-gradient(to left, var(--color-gradient-1), var(--color-gradient-2))"
                  : "transparent",
              color: lesson._id === selectedLessonId ? "white" : "black",
            }}
          >
            <ListItemText primary={`${lesson.order}. ${lesson.title}`} />
            <div className="flex flex-col justify-center items-center">
              <Delete
                fontSize="medium"
                className={`cursor-pointer hover:rotate-180 transition-transform! duration-300! ${
                  lesson._id !== selectedLessonId ? "text-red-700" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  showAlert(() => deleteLesson(lesson._id));
                }}
              />
              <EditNote
                fontSize="medium"
                className={`cursor-pointer hover:scale-125 transition-transform! duration-200! ${
                  lesson._id !== selectedLessonId ? "text-amber-600" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/instructor/courses/${id}/edit-lesson/${lesson._id}`
                  );
                }}
              />
            </div>
          </ListItem>
        ))}
        {/* <ListItem className="bg-gradient-to-l from-gradient-1 to-gradient-2 text-white font-bold cursor-pointer duration-200 p-4 rounded-sm shadow-lg">
          <ListItemText primary="1. introduction to javascript" />
        </ListItem>
        <ListItem className="cursor-pointer hover:font-bold hover:text-gradient-1">
          <ListItemText primary="2. variables and data types" />
        </ListItem>
        <ListItem className="cursor-pointer hover:font-bold hover:text-gradient-1">
          <ListItemText primary="3. functions and scope" />
        </ListItem>
        <ListItem className="cursor-pointer hover:font-bold hover:text-gradient-1">
          <ListItemText primary="4. objects and arrays" />
        </ListItem>
        <ListItem className="cursor-pointer hover:font-bold hover:text-gradient-1">
          <ListItemText primary="5. control flow and loops" />
        </ListItem>
        <ListItem className="cursor-pointer hover:font-bold hover:text-gradient-1">
          <ListItemText primary="6. events and event handling" />
        </ListItem>
        <ListItem className="cursor-pointer hover:font-bold hover:text-gradient-1">
          <ListItemText primary="7. DOM manipulation" />
        </ListItem> */}
      </List>
    </nav>
  );
}

export default CourseContent;

import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import type { ICourseLessonPopulated } from "../../interfaces/courseLesson";
import { Delete, EditNote } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteCourseLesson } from "../../hooks/useCourseLessons";
import { showAlert } from "../../utils/helpers";
import { useAppSelector } from "../../store/hooks";

type CourseContentProps = {
  lessons: ICourseLessonPopulated["lessons"];
  selectedLessonId?: string | null;
  onSelect: (lessonId: string) => void;
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
};

function CourseContent({
  lessons,
  selectedLessonId,
  onSelect,
  openDrawer,
  toggleDrawer,
}: CourseContentProps) {
  const { role: userRole } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const isMobile = useMediaQuery("(max-width:1024px)");

  const { mutate: deleteLesson } = useDeleteCourseLesson();

  const courseContentSidebar = (
    <List className="mt-2">
      <Button
        sx={{ mb: 3 }}
        variant="outlined"
        className="w-full  border-gradient-2! text-gradient-1! font-bold"
        onClick={() => navigate(`/instructor/courses/${id}/add-lesson`)}
      >
        Add Lesson
      </Button>
      {lessons.map((lesson) => {
        const isActive = lesson._id === selectedLessonId;

        return (
          <ListItem
            key={lesson._id}
            disablePadding
            sx={{
              mb: 1,
              borderRadius: 2,
              bgcolor: isActive ? "rgba(204, 204, 204, 0.26)" : "transparent",
              borderLeft: isActive
                ? "4px solid var(--color-gradient-2)"
                : "4px solid transparent",
            }}
          >
            <ListItemButton
              onClick={() => {
                onSelect(lesson._id);
                toggleDrawer(false);
              }}
              sx={{
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                "&:hover .lesson-actions": {
                  opacity: 1,
                },
              }}
            >
              {/* Order */}
              <Box
                sx={{
                  minWidth: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {lesson.order}
              </Box>

              {/* Title */}
              <ListItemText
                primary={lesson.title}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isActive ? "bold" : "normal",
                  noWrap: true,
                }}
              />

              {/* Actions */}
              {userRole === "instructor" && (
                <Box
                  className="lesson-actions"
                  sx={{
                    display: "flex",
                    gap: 1,
                    opacity: isActive ? 1 : 0,
                    transition: "0.2s",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Delete
                    fontSize="small"
                    sx={{ cursor: "pointer", color: "#ef4444" }}
                    onClick={() => showAlert(() => deleteLesson(lesson._id))}
                  />
                  <EditNote
                    fontSize="small"
                    sx={{ cursor: "pointer", color: "#f59e0b" }}
                    onClick={() =>
                      navigate(
                        `/instructor/courses/${id}/edit-lesson/${lesson._id}`
                      )
                    }
                  />
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => toggleDrawer(false)}
        >
          {courseContentSidebar}
        </Drawer>
      ) : (
        courseContentSidebar
      )}
    </>
  );
}

export default CourseContent;

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
import { Close, Delete, EditNote } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteCourseLesson } from "../../hooks/useCourseLessons";
import { showAlert } from "../../utils/helpers";
import { useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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
  const { t } = useTranslation();
  const { role: userRole, email: userEmail } = useAppSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const isMobile = useMediaQuery("(max-width:1024px)");

  const { mutate: deleteLesson } = useDeleteCourseLesson();

  function onDeleteLesson(lessonId: string) {
    if (userEmail === "instructor_demo@lms.com")
      return toast.error("Course cannot be deleted, due to user restrictions!");

    showAlert(() => deleteLesson(lessonId));
  }

  const courseContentSidebar = (
    <Box
      sx={{
        // width: isMobile ? 380 : 480,
        minWidth: 280,
        maxWidth: isMobile ? 300 : 480,
        // overflow: "hidden",
        borderLeft: "1px solid",
        borderColor: "divider",
        p: 1,
      }}
    >
      <List className="mt-2 relative">
        {isMobile && (
          <Box sx={{ mb: 6 }}>
            <ListItemButton
              sx={{ position: "absolute", right: 0, top: 0 }}
              onClick={() => toggleDrawer(false)}
            >
              <Close />
            </ListItemButton>
          </Box>
        )}
        {userRole === "instructor" && (
          <Button
            sx={{ mb: 3 }}
            variant="outlined"
            className="w-full  border-gradient-2! text-gradient-1! font-bold"
            onClick={() => navigate(`/instructor/courses/${id}/add-lesson`)}
          >
            {t("courseLessons.courseContent.addLessonButtonText")}
          </Button>
        )}
        {lessons.map((lesson) => {
          const isActive = lesson._id === selectedLessonId;

          return (
            <ListItem
              key={lesson._id}
              disablePadding
              sx={{
                position: "relative",
                mb: 2.3,
                borderRadius: 2,
                bgcolor: isActive ? "rgba(204, 204, 204, 0.26)" : "transparent",
                borderLeft: isActive
                  ? "4px solid var(--color-gradient-2)"
                  : "4px solid transparent",
                "&:hover .lesson-actions": {
                  opacity: 1,
                },
              }}
            >
              {userRole === "instructor" && (
                <Box
                  className="lesson-actions"
                  sx={{
                    position: "absolute",
                    top: -14,
                    right: 0,
                    display: "flex",
                    gap: 1,
                    opacity: isActive ? 1 : 0,
                    transition: "0.2s",
                    zIndex: 1,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteLesson(lesson._id);
                    }}
                    sx={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      backgroundColor: "#F7F6F6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Delete
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "#ef4444" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      backgroundColor: "#f7f6f6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
                </Box>
              )}
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
                  slotProps={{
                    primary: {
                      fontSize: 13,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
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

import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import type { ICourse } from "../interfaces/course";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { collapseString, isStringCollapsable } from "../utils/helpers";
import type { IEnrollment } from "../interfaces/enrollment";

interface Props {
  course: ICourse | IEnrollment["courseId"];
  role?: "instructor" | "student" | "admin";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView: (id: string) => void;
  onEnroll?: (id: string) => void;
  enrolledIds?: string[];
}

const CourseCard = ({
  course,
  role,
  onEdit,
  onDelete,
  onView,
  onEnroll,
  enrolledIds,
}: Props) => {
  const { t } = useTranslation();

  const [seeMore, setSeeMore] = useState(false);

  const isDescCollapsable = isStringCollapsable(course.description);

  const courseDesc = useMemo(
    () => (seeMore ? course.description : collapseString(course.description)),
    [seeMore, course.description]
  );

  function toggleSeeMore() {
    setSeeMore(!seeMore);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card
        sx={{
          height: 380,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "12rem",
            cursor:
              enrolledIds?.includes(course._id) || role === "instructor"
                ? "pointer"
                : "default",
          }}
          onClick={() => onView(course._id)}
        >
          <img
            loading="lazy"
            src={course.image || "/placeholder.png"}
            alt={course.name}
            className="w-full h-full object-fill"
          />
        </Box>
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 0.5,
            overflow: "auto",
          }}
        >
          <div className="p-2">
            <Typography
              variant="h6"
              className="text-gradient-1 font-semibold text-center text-lg!"
              sx={{}}
            >
              {course.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-2">
              {courseDesc}{" "}
              {isDescCollapsable && (
                <button
                  className="text-gray-400 font-bold cursor-pointer"
                  onClick={toggleSeeMore}
                >
                  {seeMore ? t("textSeeLess") : t("textSeeMore")}
                </button>
              )}
            </Typography>
          </div>
          <Box className="mt-auto pt-3 flex justify-center gap-2">
            {role === "instructor" && (
              <>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(90deg, #12557b, #408391)",
                  }}
                  onClick={() => onEdit?.(course._id.toString())}
                >
                  {t("instructorCoursesPage.editButtonText")}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete?.(course._id.toString())}
                >
                  {t("instructorCoursesPage.deleteButtonText")}
                </Button>
              </>
            )}

            {role === "student" && (
              <>
                {enrolledIds?.includes(course._id.toString()) ? (
                  <Button
                    variant="contained"
                    sx={{
                      background: "linear-gradient(90deg, #12557b, #408391)",
                    }}
                    onClick={() => onView(course._id.toString())}
                  >
                    {t("BtnTextViewCourse")}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => onEnroll?.(course._id.toString())}
                  >
                    Enroll
                  </Button>
                )}
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCard;

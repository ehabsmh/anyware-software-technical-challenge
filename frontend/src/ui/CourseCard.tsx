import { Card, CardContent, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import type { ICourse } from "../interfaces/course";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  course: ICourse;
  role?: "instructor" | "student" | "admin";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

const CourseCard = ({ course, role, onEdit, onDelete, onView }: Props) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [seeMore, setSeeMore] = useState(false);

  function toggleSeeMore() {
    setSeeMore(!seeMore);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      className="w-full max-w-[360px]"
    >
      <Card>
        <div className="w-full h-[210px] flex justify-center items-center bg-gray-100 rounded-t-lg">
          <img
            src={course.image || "/placeholder.png"}
            alt={course.name}
            className="w-full h-full object-contain cursor-pointer"
            onClick={() =>
              navigate(
                `${pathname.endsWith("/") ? pathname : pathname + "/"}${
                  course._id
                }`
              )
            }
          />
        </div>
        <CardContent>
          <Typography
            variant="h6"
            className="text-gradient-1 font-semibold text-center"
          >
            {course.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-2">
            {!seeMore
              ? course.description.split(" ").slice(0, 15).join(" ")
              : course.description}{" "}
            <button
              className="text-gray-400 font-bold cursor-pointer"
              onClick={toggleSeeMore}
            >
              {seeMore ? "See less" : "See more"}
            </button>
          </Typography>

          {role === "instructor" && (
            <div className="flex justify-center gap-2 mt-2">
              <Button
                variant="contained"
                sx={{ background: "linear-gradient(90deg, #12557b, #408391)" }}
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
            </div>
          )}

          {role === "student" && (
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #12557b, #408391)",
                mt: 2,
              }}
              onClick={() => onView?.(course._id.toString())}
            >
              View
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCard;

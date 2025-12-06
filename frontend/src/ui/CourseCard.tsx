import { Card, CardContent, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import type { ICourse } from "../interfaces/course";

interface Props {
  course: ICourse;
  role?: "instructor" | "student" | "admin";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

const CourseCard = ({ course, role, onEdit, onDelete, onView }: Props) => {
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
            className="w-full h-full object-contain"
          />
        </div>
        <CardContent className="text-center">
          <Typography
            variant="h6"
            className="text-[--color-gradient-1] font-semibold"
          >
            {course.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-2">
            {course.description}
          </Typography>

          {role === "instructor" && (
            <div className="flex justify-center gap-2 mt-2">
              <Button
                variant="contained"
                sx={{ background: "linear-gradient(90deg, #12557b, #408391)" }}
                onClick={() => onEdit?.(course._id.toString())}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete?.(course._id.toString())}
              >
                Delete
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

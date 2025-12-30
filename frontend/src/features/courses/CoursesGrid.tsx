import { Box } from "@mui/material";
import CourseSkeleton from "../../skeletons/course";

type CoursesGridProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

function CoursesGrid({ children, isLoading }: CoursesGridProps) {
  return (
    <>
      {/* Courses Grid */}
      {isLoading && (
        <Box className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <CourseSkeleton key={i} />
          ))}
        </Box>
      )}

      {!isLoading && (
        <Box className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </Box>
      )}
    </>
  );
}

export default CoursesGrid;

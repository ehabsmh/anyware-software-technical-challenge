import { Box } from "@mui/material";
import CourseSkeleton from "../../skeletons/course";

type CoursesGridProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

function CoursesGrid({ children, isLoading }: CoursesGridProps) {
  return (
    <Box className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading && [...Array(6)].map((_, i) => <CourseSkeleton key={i} />)}

      {!isLoading && children}
    </Box>
  );
}

export default CoursesGrid;

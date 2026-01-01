import { Box, Skeleton, useMediaQuery } from "@mui/material";

function CourseContentSkeleton() {
  const isMobile = useMediaQuery("(max-width:1024px)");

  if (isMobile) return null;

  return (
    <Box className="mt-2 w-80.5">
      <Skeleton
        variant="rectangular"
        className="w-full mb-4 border-gradient-2! text-gradient-1! font-bold"
        height={40}
      />

      {Array.from({ length: 15 }).map((_, index) => (
        <Skeleton
          key={index}
          height={30}
          sx={{
            mb: 1,
            borderRadius: 2,
          }}
        />
      ))}
    </Box>
  );
}

export default CourseContentSkeleton;

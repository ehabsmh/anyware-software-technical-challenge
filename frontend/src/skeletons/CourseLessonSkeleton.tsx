import { Box, Skeleton, useMediaQuery } from "@mui/material";

function CourseLessonSkeleton() {
  const isMobile = useMediaQuery("(max-width:1024px)");

  return (
    <Box sx={{ width: "100%", borderRadius: 2 }}>
      {/* Mobile Header */}
      {isMobile && (
        <Box sx={{ p: 2 }}>
          <Skeleton variant="rectangular" width={120} height={36} />
          <Skeleton sx={{ mt: 1 }} width="70%" height={28} />
        </Box>
      )}

      {/* Video Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{
          aspectRatio: "12/4",
          borderRadius: 2,
          height: "auto",
        }}
      />

      {/* Tabs Skeleton */}
      <Box sx={{ display: "flex", gap: 2, mt: 2, px: 2 }}>
        <Skeleton width={100} height={40} />
        <Skeleton width={120} height={40} />
        <Skeleton width={140} height={40} />
      </Box>

      {/* Content Skeleton */}
      <Box sx={{ p: 3 }}>
        <Skeleton width="40%" height={30} />
        <Skeleton sx={{ mt: 1 }} width="100%" height={20} />
        <Skeleton sx={{ mt: 1 }} width="90%" height={20} />
        <Skeleton sx={{ mt: 1 }} width="85%" height={20} />
      </Box>
    </Box>
  );
}

export default CourseLessonSkeleton;

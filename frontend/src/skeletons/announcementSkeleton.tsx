import { Box, Skeleton, Stack } from "@mui/material";

function AnnouncementSkeleton() {
  return (
    <Stack className="space-y-10 mt-5 shadow-md! hover:shadow-xl! transition-all duration-200 relative">
      {/* Delete/Edit icons skeleton */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 8,
          cursor: "pointer",

          display: "flex",
          gap: "12px",
        }}
      >
        <Skeleton width={30} height={30} />
        <Skeleton width={30} height={30} />
      </Box>

      {/* Content skeleton */}
      <Box sx={{ mt: 1.2 }}>
        <Skeleton height={60} width="80%" />
        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="80%" />
      </Box>

      {/* Author and date skeleton */}
      <Box className="flex justify-between items-center mt-3 mx-2 my-2 text-sm text-gray-500">
        <Box className="flex items-center space-x-2">
          <Skeleton variant="circular" width={35} height={35} />
          <Skeleton width={100} height={20} />
        </Box>
        <Skeleton width={80} height={20} />
      </Box>
    </Stack>
  );
}

export default AnnouncementSkeleton;

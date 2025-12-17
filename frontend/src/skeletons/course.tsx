import { Skeleton } from "@mui/material";

function CourseSkeleton() {
  return (
    <div className="w-full max-w-90 bg-white">
      <Skeleton variant="rectangular" width="100%" height={210} />
      <Skeleton height={30} width="40%" sx={{ mt: 2, mx: "auto" }} />
      <Skeleton height={20} width="80%" sx={{ mt: 2, mx: "auto" }} />
      <Skeleton height={20} width="80%" sx={{ mx: "auto" }} />
      <div className="flex justify-center gap-2 mt-2">
        <Skeleton height={50} width="30%" />
        <Skeleton height={50} width="30%" />
      </div>
    </div>
  );
}

export default CourseSkeleton;

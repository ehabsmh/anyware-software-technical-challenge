import { Skeleton, Stack } from "@mui/material";

function AnnouncementFilterSkeleton() {
  return (
    <Stack
      direction="row"
      spacing={2}
      className="shadow-lg"
      sx={{ alignItems: "center" }}
    >
      <Skeleton width={200} height={70} />
      <Skeleton width={150} height={40} />
    </Stack>
  );
}

export default AnnouncementFilterSkeleton;

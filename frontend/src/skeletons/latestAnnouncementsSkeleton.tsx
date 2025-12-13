import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Skeleton,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function LatestAnnouncementsSkeleton() {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      className="shadow-none mb-6"
      sx={{
        display: "flex",
        flexDirection: isMobileOrTablet ? "column" : "row",
        alignItems: isMobileOrTablet ? "flex-start" : "stretch",
        p: 2,
      }}
    >
      {/* Left section (Avatar + name) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: isMobileOrTablet ? 1 : 0,
          minWidth: isMobileOrTablet ? "100%" : 200,
        }}
      >
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          title={<Skeleton width={90} height={14} />}
          subheader={<Skeleton width={120} height={12} />}
          sx={{ p: 0 }}
        />
      </Box>

      {/* Divider */}
      <Divider
        orientation={isMobileOrTablet ? "horizontal" : "vertical"}
        flexItem
        sx={{
          my: isMobileOrTablet ? 1 : 0,
          mx: isMobileOrTablet ? 0 : 2,
        }}
      />

      {/* Content */}
      <CardContent
        sx={{
          p: 0,
          flex: 1,
          width: "100%",
          maxWidth: isMobileOrTablet ? "100%" : "80%",
        }}
      >
        <Skeleton variant="text" sx={{ width: "100%" }} />
        <Skeleton variant="text" sx={{ width: "95%" }} />
        <Skeleton variant="text" sx={{ width: "90%" }} />
      </CardContent>
    </Card>
  );
}

export default LatestAnnouncementsSkeleton;

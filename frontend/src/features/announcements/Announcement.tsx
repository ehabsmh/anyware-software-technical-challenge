import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Divider,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

type AnnouncementProps = {
  instructor: string;
  content: string;
  course: string;
};

function Announcement({ instructor, content, course }: AnnouncementProps) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      className="!shadow-none mb-6"
      sx={{
        display: "flex",
        flexDirection: isMobileOrTablet ? "column" : "row",
        alignItems: isMobileOrTablet ? "flex-start" : "stretch",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: isMobileOrTablet ? 1 : 0,
          minWidth: isMobileOrTablet ? "100%" : 200,
        }}
      >
        <CardHeader
          avatar={<Avatar>{instructor[0]}</Avatar>}
          title={
            <Typography
              sx={{ fontSize: isMobileOrTablet ? "0.9rem" : "0.8rem" }}
            >
              {instructor}
            </Typography>
          }
          subheader={
            <Typography
              variant="body2"
              sx={{
                fontSize: isMobileOrTablet ? "0.8rem" : "0.7rem",
                color: "gray",
              }}
            >
              {course || "General"}
            </Typography>
          }
          sx={{ p: 0 }}
        />
      </Box>

      <Divider
        orientation={isMobileOrTablet ? "horizontal" : "vertical"}
        flexItem
        sx={{
          my: isMobileOrTablet ? 1 : 0,
          mx: isMobileOrTablet ? 0 : 2,
        }}
      />

      <CardContent
        sx={{
          p: 0,
          flex: 1,
          maxWidth: isMobileOrTablet ? "100%" : "80%",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: isMobileOrTablet ? "0.9rem" : "0.85rem" }}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Announcement;

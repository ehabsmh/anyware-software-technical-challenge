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
import type { ILatestAnnouncement } from "../../interfaces/announcement";

type AnnouncementProps = {
  author: ILatestAnnouncement["author"];
  content: ILatestAnnouncement["content"];
  course: ILatestAnnouncement["course"];
};

function Announcement({ author, content, course }: AnnouncementProps) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      className="mb-5"
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
          width: isMobileOrTablet ? "100%" : "",
          // backgroundColor: "red",
          minWidth: isMobileOrTablet ? "100%" : 200,
        }}
        className="lg:w-44! 2xl:w-56!"
      >
        <CardHeader
          avatar={<Avatar src={author.avatar} />}
          title={
            <Typography
              sx={{ fontSize: isMobileOrTablet ? "0.9rem" : "0.8rem" }}
            >
              {author.name}
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
              {course?.name || "General"}
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

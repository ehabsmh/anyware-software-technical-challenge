import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import type {
  ICourseLesson,
  ICourseLessonPopulated,
} from "../../interfaces/courseLesson";

function CourseOverview({
  lesson,
  courseOverview,
}: {
  lesson: ICourseLesson;
  courseOverview: ICourseLessonPopulated["courseDetails"];
}) {
  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            alt={courseOverview.name}
            src={courseOverview.image}
          />
        </ListItemAvatar>
        <ListItemText
          primary={courseOverview.name}
          sx={{
            "& .MuiListItemText-primary": { fontWeight: "bold" },
          }}
          className="text-gradient-1"
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                sx={{ display: "inline", fontWeight: "bold" }}
              >
                {lesson?.title}
              </Typography>{" "}
              —{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {lesson?.content}
              </Typography>
            </>
          }
        />
      </ListItem>
      <ListItem className="flex gap-3 items-center">
        <Avatar
          alt={courseOverview.instructor.name}
          src={courseOverview.instructor.avatar}
          sx={{ width: 32, height: 32 }}
        />
        <Typography
          sx={{ display: "block", marginTop: "8px" }}
          variant="body2"
          color="text.secondary"
        >
          {courseOverview.instructor.name}
        </Typography>
      </ListItem>
    </List>
  );
}

export default CourseOverview;

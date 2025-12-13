import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import type { ICourseLesson } from "../../interfaces/courseLesson";

function CourseOverview({ lesson }: { lesson: ICourseLesson }) {
  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Master JavaScript"
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
              — {lesson?.content}
            </>
          }
        />
        <div className="flex gap-3 items-center">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 32, height: 32 }}
          />
          <Typography
            sx={{ display: "block", marginTop: "8px" }}
            variant="body2"
            color="text.secondary"
          >
            By: Mohamed Ali Hassan
          </Typography>
        </div>
      </ListItem>
    </List>
  );
}

export default CourseOverview;

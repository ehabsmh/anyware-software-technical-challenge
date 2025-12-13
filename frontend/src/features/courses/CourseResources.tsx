import { Link } from "@mui/icons-material";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import type { ICourseLesson } from "../../interfaces/courseLesson";

export default function CourseResources({
  lesson,
}: {
  lesson?: ICourseLesson;
}) {
  return (
    <Box sx={{ mt: 2 }}>
      <List
        sx={{
          width: "100%",
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          gap: 5,
          p: 2,
        }}
      >
        {lesson?.resources?.map((res, index) => (
          <ListItem
            key={index}
            sx={{ backgroundColor: "white", p: 2 }}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => window.open(res.url, "_blank")}
              >
                <Link />
              </IconButton>
            }
          >
            <ListItemText primary={res.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

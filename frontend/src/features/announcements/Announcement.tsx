import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

type AnnouncementProps = {
  instructor: string;
  content: string;
  course: string;
};

function Announcement({ instructor, content, course }: AnnouncementProps) {
  return (
    <Card className="flex items-center !shadow-none mb-6">
      <CardHeader
        avatar={<Avatar>{instructor[0]}</Avatar>}
        title={
          <Typography sx={{ fontSize: "0.8rem" }}>{instructor}</Typography>
        }
        subheader={
          <Typography
            variant="body2"
            sx={{ fontSize: "0.7rem", color: "gray" }}
          >
            {course}
          </Typography>
        }
      />

      <Divider orientation="vertical" flexItem />
      <CardContent className="max-w-[80%]">
        <Typography variant="body2" color="text.secondary" className="">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Announcement;

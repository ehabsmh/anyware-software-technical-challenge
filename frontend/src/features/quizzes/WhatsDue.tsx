import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadUpcomingQuizzes, upcomingQuizzes } from "./quizzesSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns/esm";
import { useTranslation } from "react-i18next";

function WhatsDue() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { upcoming, loading } = useAppSelector(upcomingQuizzes);

  useEffect(() => {
    dispatch(loadUpcomingQuizzes());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  // if (error) {
  //   return <div className="text-red-500">Failed to load data.</div>;
  // }

  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader
        title={t("dashboard.whatsDue.title")}
        sx={{
          "& .MuiCardHeader-title": {
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#374151", // gray-700
          },
        }}
      />
      <Divider />
      <CardContent className="space-y-4">
        {upcoming.length > 0 ? (
          upcoming.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <Typography variant="body2" className="text-gray-500">
                Course: {item.course.name}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Topic: {item.topic}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Due Date: {format(new Date(item.dueDate), "PPP p")}
              </Typography>
              <Button
                component={Link}
                to={`/student/quizzes/solve/${item._id}`}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Start Quiz
              </Button>
            </div>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No upcoming quizzes 🎉
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default WhatsDue;

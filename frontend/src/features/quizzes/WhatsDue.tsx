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

function WhatsDue() {
  const dispatch = useAppDispatch();
  const { upcoming, loading } = useAppSelector(upcomingQuizzes);

  useEffect(() => {
    dispatch(loadUpcomingQuizzes());
  }, [dispatch]);
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader
        title="What's Due"
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
        {loading && <p>Loading...</p>}
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
                Due Date: {item.dueDate.toString()}
              </Typography>
              <Button
                component={Link}
                to={`/quizzes/${item._id}`}
                variant="outlined"
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

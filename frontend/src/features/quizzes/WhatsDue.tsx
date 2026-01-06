import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useUpcomingQuizzes } from "../../hooks/useQuizzes";

function WhatsDue() {
  const { t } = useTranslation();
  const { data: upcoming, isLoading } = useUpcomingQuizzes();

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader
        title={t("dashboard.whatsDue.title")}
        titleTypographyProps={{
          fontWeight: 600,
          fontSize: "1.2rem",
        }}
      />
      <Divider />

      <CardContent className="space-y-4">
        {/* Loading */}
        {isLoading && (
          <Box className="space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} height={70} />
            ))}
          </Box>
        )}

        {/* Empty state */}
        {!isLoading && (!upcoming || upcoming.length === 0) && (
          <Typography variant="body2" color="text.secondary">
            {t("dashboard.whatsDue.noQuizzesBtnText")}
          </Typography>
        )}

        {/* Quizzes */}
        {!isLoading &&
          upcoming?.map((quiz) => (
            <Box
              key={quiz._id}
              className="flex flex-col gap-2 p-3 rounded-lg border border-gray-200"
            >
              <Box className="grid grid-cols-[80px_1fr]">
                <Typography variant="caption" color="text.secondary">
                  {t("dashboard.whatsDue.courseTitle")}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {quiz.course.name}
                </Typography>
              </Box>

              <Box className="grid grid-cols-[80px_1fr]">
                <Typography variant="caption" color="text.secondary">
                  {t("dashboard.whatsDue.topicTitle")}
                </Typography>
                <Typography variant="body2">{quiz.topic}</Typography>
              </Box>

              <Box className="grid grid-cols-[80px_1fr] items-center">
                <Typography variant="caption" color="text.secondary">
                  {t("dashboard.whatsDue.dueDateTitle")}
                </Typography>
                <Typography variant="body2">
                  {format(new Date(quiz.dueDate), "PPP p")}
                </Typography>
              </Box>

              <Button
                component={Link}
                to={`/student/quizzes/solve/${quiz._id}`}
                variant="outlined"
                size="small"
                sx={{ mt: 1, alignSelf: "center", width: "100%" }}
              >
                {t("dashboard.whatsDue.startQuizBtnText")}
              </Button>
            </Box>
          ))}
      </CardContent>
    </Card>
  );
}

export default WhatsDue;

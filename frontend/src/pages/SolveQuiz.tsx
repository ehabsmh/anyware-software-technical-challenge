// src/features/quizzes/QuizPage.tsx
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadCurrentQuiz } from "../features/quizzes/quizzesSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { submitQuiz } from "../services/apiQuizzes";
import type { IQuizSubmission } from "../interfaces/quiz";
import { toast } from "sonner";

function SolveQuiz() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentQuiz, loading } = useAppSelector((state) => state.quizzes);

  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<IQuizSubmission | null>(null);

  useEffect(() => {
    if (id) dispatch(loadCurrentQuiz(id));
  }, [id, dispatch]);

  const handleAnswerChange = (qIndex: number, optionIndex: number) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!id) return;
    if (answers.length < currentQuiz!.questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      const res = await submitQuiz(id, answers);
      if (res) setResult(res);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) return <p>Loading quiz...</p>;

  return (
    <section className="overflow-y-auto w-full h-[calc(100vh-86px)]">
      <Box className="max-w-3xl mx-auto mt-8">
        {currentQuiz && (
          <Card className="shadow-lg rounded-2xl">
            <CardHeader
              title={currentQuiz.topic}
              subheader={`Course: ${currentQuiz.course.name}`}
              sx={{
                "& .MuiCardHeader-title": {
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                },
              }}
            />
            <Divider />
            <CardContent>
              {currentQuiz.questions.map((q, qIndex) => (
                <Box key={qIndex} className="mb-6">
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Q{qIndex + 1}. {q.question}
                  </Typography>
                  <RadioGroup
                    value={answers[qIndex] ?? null}
                    onChange={(e) =>
                      handleAnswerChange(qIndex, Number(e.target.value))
                    }
                  >
                    {q.options.map((opt, oIndex) => (
                      <FormControlLabel
                        key={oIndex}
                        value={oIndex}
                        control={<Radio />}
                        label={opt}
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
                fullWidth
              >
                Submit Answers
              </Button>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="shadow-lg rounded-2xl mt-6 bg-green-50">
            <CardHeader title="Results" />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Score: {result.score} / {result.total}
              </Typography>
              {result.details.map((d, i: number) => (
                <Box key={i} className="mb-4">
                  <Typography variant="body1">
                    <strong>Q{i + 1}: </strong> {d.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={d.correct ? "success.main" : "error.main"}
                  >
                    Your Answer:{" "}
                    {d.userAnswer !== undefined
                      ? currentQuiz?.questions[i].options[d.userAnswer!]
                      : "N/A"}{" "}
                    | Correct Answer:{" "}
                    {d.correctAnswer !== undefined
                      ? currentQuiz?.questions[i].options[d.correctAnswer]
                      : "N/A"}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        )}
      </Box>
    </section>
  );
}

export default SolveQuiz;

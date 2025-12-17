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
  TextField,
  Checkbox,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import type {
  ICorrectQuiz,
  IQuizSubmissionPopulated,
  IQuizUpcoming,
  ISubmitQuiz,
} from "../../../interfaces/quiz";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";
import { BsExclamationCircle } from "react-icons/bs";
import { useCorrectQuiz, useSubmitQuiz } from "../../../hooks/useQuizzes";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type QuizProps = {
  quiz: IQuizUpcoming | IQuizSubmissionPopulated;
  review?: boolean;
  isInstructor?: boolean;
};

function Quiz({ quiz, review = false, isInstructor = false }: QuizProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, control, setValue } = useFormContext<
    ISubmitQuiz | ICorrectQuiz
  >();

  const { mutate: submitQuiz, isPending } = useSubmitQuiz();

  const { mutate: correctQuiz } = useCorrectQuiz();

  const { id: submissionId } = useParams<{ id: string }>();

  useEffect(() => {
    if (review) return;

    (quiz as IQuizUpcoming).questions.forEach((q, qIndex) => {
      setValue(`answers.${qIndex}.questionId`, q._id);
    });
  }, [quiz, setValue, review]);

  function onSubmit(data: ISubmitQuiz | ICorrectQuiz) {
    if (!review) submitQuiz(data as ISubmitQuiz);

    if (review && isInstructor) {
      if (!submissionId) return;

      const correctedData: ICorrectQuiz = {
        submissionId,
        answers: (data as ICorrectQuiz).answers.map((ans) => ({
          instructorNote: ans.instructorNote,
          points: ans.points || 0,
          questionScore: ans.questionScore || 0,
          questionId: ans.questionId,
        })),
      };

      correctQuiz(correctedData);
    }
  }

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader
        title={
          review
            ? `${(quiz as IQuizSubmissionPopulated).quizId.topic}`
            : (quiz as IQuizUpcoming).topic
        }
        subheader={`Course: ${
          review
            ? (quiz as IQuizSubmissionPopulated).quizId.course.name
            : (quiz as IQuizUpcoming).course.name
        }`}
        sx={{
          "& .MuiCardHeader-title": {
            fontWeight: "bold",
            fontSize: "1.5rem",
          },
        }}
      />
      <Divider />
      <CardContent>
        {quiz.questions?.map((q, qIndex) => (
          <Box key={q._id} className="mb-6">
            <div className="bg-gradient-2 w-full h-[0.20rem] rounded-full relative mb-3">
              <div className="text-xs font-mono absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red bg-white px-2 rounded-md">
                <p className="font-bold text-lg text-gray-500">
                  {q.type === "true_false"
                    ? t("createQuizQuestions.question.trueFalse")
                    : q.type === "short_answer"
                    ? t("createQuizQuestions.question.shortAnswer")
                    : t("createQuizQuestions.question.multipleChoice")}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Q{qIndex + 1}. {q.question}
                </Typography>
                {review &&
                  ((quiz as IQuizSubmissionPopulated).answers[qIndex]
                    .isCorrect === "true" ? (
                    <Tooltip
                      title={`${
                        (quiz as IQuizSubmissionPopulated).answers[qIndex]
                          .points
                      } out of ${q.points}`}
                    >
                      <GiCheckMark className="text-green-500 inline-block mb-2" />
                    </Tooltip>
                  ) : (quiz as IQuizSubmissionPopulated).answers[qIndex]
                      .isCorrect === "false" ? (
                    <GiCrossMark className="text-red-500 inline-block mb-2" />
                  ) : (quiz as IQuizSubmissionPopulated).answers[qIndex]
                      .isCorrect === "partially" ? (
                    <Tooltip
                      title={`${
                        (quiz as IQuizSubmissionPopulated).answers[qIndex]
                          .points
                      } out of ${q.points}`}
                    >
                      <BsExclamationCircle className="text-yellow-600 inline-block mb-2" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Being Reviewed">
                      <BsExclamationCircle className="text-black inline-block mb-2" />
                    </Tooltip>
                  ))}
              </div>
            </div>
            <RadioGroup>
              {q.type === "mcq" && (
                <Controller
                  name={`answers.${qIndex}.answer`}
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <>
                      {q.options?.map((opt, oIndex) => {
                        const fieldValue = field.value as number[];
                        const checked = fieldValue.includes(oIndex);

                        return (
                          <div
                            key={oIndex}
                            className="flex gap-2 items-center mb-2"
                          >
                            <Checkbox
                              checked={checked}
                              disabled={review}
                              onChange={() => {
                                if (review) return;

                                if (checked) {
                                  // Remove index
                                  field.onChange(
                                    fieldValue.filter((v) => v !== oIndex)
                                  );
                                } else {
                                  // Add index
                                  field.onChange([...fieldValue, oIndex]);
                                }
                              }}
                            />
                            <p>{opt}</p>
                          </div>
                        );
                      })}
                    </>
                  )}
                />
              )}

              {q.type === "true_false" && (
                <Controller
                  name={`answers.${qIndex}.answer`}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} value={field.value || ""}>
                      <FormControlLabel
                        value={"true"}
                        control={<Radio />}
                        label="True"
                        disabled={review}
                      />
                      <FormControlLabel
                        value={"false"}
                        control={<Radio />}
                        label="False"
                        disabled={review}
                      />
                    </RadioGroup>
                  )}
                />
              )}

              {q.type === "short_answer" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Your answer"
                  rows={3}
                  multiline
                  disabled={review}
                  {...register(`answers.${qIndex}.answer`)}
                />
              )}
            </RadioGroup>

            {review &&
              !isInstructor &&
              (quiz as IQuizSubmissionPopulated).answers[qIndex]
                .instructorNote && (
                <Box className="mt-4 p-4 rounded-lg">
                  <Typography variant="subtitle2" gutterBottom>
                    {t("textInstructorNote")}:
                  </Typography>
                  <Typography variant="body2">
                    {
                      (quiz as IQuizSubmissionPopulated).answers[qIndex]
                        .instructorNote
                    }
                  </Typography>
                </Box>
              )}

            {review && isInstructor && (
              <Box className="mt-4">
                <TextField
                  label="Score"
                  hidden
                  {...register(`answers.${qIndex}.questionScore`, {
                    valueAsNumber: true,
                    value: q.points,
                  })}
                />
                <TextField
                  sx={{ width: "100%" }}
                  label="Note"
                  multiline
                  {...register(`answers.${qIndex}.instructorNote`)}
                />
                {q.type === "short_answer" && (
                  <TextField
                    size="small"
                    sx={{ width: 120, mt: 2 }}
                    label={`Points / ${q.points}`}
                    {...register(`answers.${qIndex}.points`, {
                      valueAsNumber: true,
                    })}
                  />
                )}
              </Box>
            )}
          </Box>
        ))}

        {review && !isInstructor ? null : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
            fullWidth
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : review && isInstructor ? (
              "Correct Quiz"
            ) : (
              "Submit Quiz"
            )}
          </Button>
        )}

        {/* {review && isInstructor && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={handleSubmit(instructorSubmit)}
          >
            Save Correction
          </Button>
        )} */}
      </CardContent>
    </Card>
  );
}

export default Quiz;

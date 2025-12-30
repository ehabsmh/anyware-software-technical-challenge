import { useParams } from "react-router-dom";
import { useQuiz } from "../hooks/useQuizzes";
import { useAppSelector } from "../store/hooks";
import { Box, CircularProgress } from "@mui/material";
import Quiz from "./../features/quizzes/solve/Quiz";
import { FormProvider, useForm } from "react-hook-form";
import type {
  ICorrectQuiz,
  IQuizSubmissionPopulated,
  ISubmitQuiz,
} from "../interfaces/quiz";
import { useEffect } from "react";

function SolveQuiz({ review = false }: { review?: boolean }) {
  const { role: currUserRole, _id: userId } = useAppSelector(
    (state) => state.user
  );

  const { id: quizId } = useParams();

  const { data: currentQuiz, isLoading, error } = useQuiz(quizId || "", review);

  const methods = useForm<ISubmitQuiz | ICorrectQuiz>({
    defaultValues:
      review && currUserRole === "instructor"
        ? {
            answers: [],
          }
        : {
            userId,
            quizId,
            answers: [],
          },
  });

  useEffect(() => {
    if (review && currentQuiz) {
      methods.reset({
        // userId: (currentQuiz as IQuizSubmission).userId,
        answers: (currentQuiz as IQuizSubmissionPopulated).answers,
      });
    }
  }, [review, currentQuiz, methods]);

  if (error) {
    return (
      <section className="overflow-y-auto w-full h-[calc(100vh-86px)]">
        <div className="text-red-500">Failed to load quiz data.</div>
      </section>
    );
  }

  return (
    <section className="overflow-y-auto w-full h-[calc(100vh-86px)]">
      <Box className="max-w-4xl mx-auto mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <FormProvider {...methods}>
            <Quiz
              quiz={currentQuiz!}
              review={review}
              isInstructor={currUserRole === "instructor"}
            />
          </FormProvider>
        )}
      </Box>
    </section>
  );
}

export default SolveQuiz;

import { useParams } from "react-router-dom";
import { useQuiz } from "../hooks/useQuizzes";
import { useAppSelector } from "../store/hooks";
import { Box } from "@mui/material";
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

  const { id: quizId } = useParams<{ id: string }>();

  const { data: currentQuiz, isLoading: loading } = useQuiz(
    quizId || "",
    review
  );
  console.log(currentQuiz);

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

  if (loading) return <p>Loading quiz...</p>;

  return (
    <section className="overflow-y-auto w-full h-[calc(100vh-86px)]">
      <Box className="max-w-3xl mx-auto mt-8">
        <FormProvider {...methods}>
          <Quiz
            quiz={currentQuiz!}
            review={review}
            isInstructor={currUserRole === "instructor"}
          />
        </FormProvider>
      </Box>
    </section>
  );
}

export default SolveQuiz;

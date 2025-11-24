import { FormProvider, useForm } from "react-hook-form";
import QuizQuestionsForm from "../../features/quizzes/create/QuizQuestionsForm";
import { useEffect, useState } from "react";
import type { IQuiz } from "../../interfaces/quiz";
import { fetchQuizQuestions } from "../../services/apiQuizzes";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

function EditQuestions() {
  const [questions, setQuestions] = useState<IQuiz["questions"]>([]);

  const { id: quizId } = useParams();

  const methods = useForm({ defaultValues: { questions } });

  useEffect(() => {
    if (!quizId) return;

    fetchQuizQuestions(quizId)
      .then((data) => setQuestions(data ?? []))
      .catch((error) =>
        toast.error(error.message || "Failed to load quiz questions")
      );
  }, [quizId]);

  useEffect(() => {
    methods.reset({ questions });
  }, [questions, methods]);

  return (
    <Box className="bg-main overflow-y-auto p-8 h-[calc(100vh-86px)]">
      <FormProvider {...methods}>
        <QuizQuestionsForm editMode={true} />
      </FormProvider>
    </Box>
  );
}

export default EditQuestions;

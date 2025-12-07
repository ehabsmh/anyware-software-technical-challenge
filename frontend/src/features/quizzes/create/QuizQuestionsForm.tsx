import { Button } from "@mui/material";
import QuestionAccordion from "./QuestionAccordion";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { IQuiz } from "../../../interfaces/quiz";
import {
  useCreateQuiz,
  useUpdateQuizQuestions,
} from "../../../hooks/useQuizzes";
import { useState } from "react";
import { useParams } from "react-router-dom";

type QuizQuestionsFormProps = {
  editMode?: boolean;
  onBack?: () => void;
};

function QuizQuestionsForm({ editMode, onBack }: QuizQuestionsFormProps) {
  const { handleSubmit, control } = useFormContext<IQuiz>();
  const { mutate: createQuiz } = useCreateQuiz();
  const { mutate: updateQuizQuestions } = useUpdateQuizQuestions();
  const { id: quizId } = useParams();

  const [deleteMode, setDeleteMode] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const initialQuestion: IQuiz["questions"][number] = {
    _id: "",
    question: "",
    type: "",
    options: [],
    answer: [],
    points: 0,
  };

  function onSubmit(data: IQuiz) {
    try {
      if (editMode) {
        updateQuizQuestions({ id: quizId!, questions: data.questions });
        return;
      }

      data.questions = data.questions.map((question) => {
        if (question.type === "mcq" && Array.isArray(question.answer)) {
          question.answer = question.answer
            .map((value, index) => (value ? index : null))
            .filter((v) => v !== null);
        }

        return question;
      });

      createQuiz(data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  }

  return (
    <div>
      <div className="flex gap-5 items-center mb-4">
        <Button
          variant="contained"
          onClick={() => append(initialQuestion)}
          sx={{ mb: 3, backgroundColor: "var(--color-gradient-1)" }}
        >
          Add Question
        </Button>
        <Button
          variant="outlined"
          sx={{ mb: 3 }}
          color="error"
          onClick={() => setDeleteMode((prev) => !prev)}
        >
          {deleteMode ? "Cancel Delete" : "Delete"}
        </Button>
      </div>

      {fields.map((field, index) => (
        <QuestionAccordion
          key={field.id}
          qIndex={index}
          deleteMode={deleteMode}
          deleteQuestion={() => remove(index)}
        />
      ))}

      <div className="flex justify-center gap-10 mt-6">
        {!editMode && (
          <>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 600,
              }}
              onClick={onBack}
            >
              Back
            </Button>
          </>
        )}
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{
            mt: 2,
            py: 1.2,
            fontWeight: 600,
            background:
              "linear-gradient(to right, var(--color-gradient-1), var(--color-gradient-2))",
            transition: "all 0.4s ease",
            "&:hover": {
              opacity: 0.9,
              background:
                "linear-gradient(to right, var(--color-gradient-2), var(--color-gradient-1))",
            },
          }}
        >
          {editMode ? "Save Changes" : "Create Quiz"}
        </Button>
      </div>
    </div>
  );
}

export default QuizQuestionsForm;

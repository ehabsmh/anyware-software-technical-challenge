import { Button } from "@mui/material";
import { useDeleteQuiz } from "../../../hooks/useQuizzes";
import { showAlert } from "../../../utils/helpers";

function DeleteQuiz({ quizId }: { quizId: string }) {
  const { mutate: deleteQuiz } = useDeleteQuiz();

  function onDeleteQuiz() {
    showAlert(() => deleteQuiz(quizId));
  }
  return (
    <Button
      size="small"
      variant="outlined"
      color="error"
      onClick={onDeleteQuiz}
    >
      Delete
    </Button>
  );
}

export default DeleteQuiz;

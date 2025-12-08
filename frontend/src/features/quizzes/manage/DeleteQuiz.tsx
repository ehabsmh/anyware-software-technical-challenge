import { Button } from "@mui/material";
import { useDeleteQuiz } from "../../../hooks/useQuizzes";
import { showAlert } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";

function DeleteQuiz({ quizId }: { quizId: string }) {
  const { t } = useTranslation();
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
      {t("manageQuizzes.deleteButtonText")}
    </Button>
  );
}

export default DeleteQuiz;

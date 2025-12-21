import { useTranslation } from "react-i18next";
import type { IInstructorQuiz } from "../interfaces/quiz";
import type { Column } from "../ui/GenericTable";
import { Box, Button } from "@mui/material";
import EditMenu from "../features/quizzes/manage/EditMenu";
import DeleteQuiz from "../features/quizzes/manage/DeleteQuiz";
import { Link } from "react-router-dom";
import { useMemo } from "react";

function useQuizzesColumns() {
  const { t } = useTranslation();

  const statusMap: Record<string, string> = useMemo(
    () => ({
      published: t("manageQuizzes.statusPublished"),
      draft: t("manageQuizzes.statusDraft"),
    }),
    [t]
  );

  const columns: Column<IInstructorQuiz["items"][number]>[] = useMemo(
    () => [
      { id: "topic", label: t("manageQuizzes.topicTableHeader"), width: "250" },
      {
        id: "course",
        label: t("manageQuizzes.courseTableHeader"),
        render: (row: IInstructorQuiz["items"][number]) => row.course.name,
        width: "300",
      },
      {
        id: "dueDate",
        label: t("manageQuizzes.dueDateTableHeader"),
        render: (row: IInstructorQuiz["items"][number]) =>
          new Date(row.dueDate).toLocaleDateString(),
        width: "100",
      },
      {
        id: "status",
        label: t("manageQuizzes.statusTableHeader"),
        width: "100",
        render: (row: IInstructorQuiz["items"][number]) =>
          statusMap[row.status] || row.status,
      },
      {
        id: "numQuestions",
        label: t("manageQuizzes.questionsNumTableHeader"),
        width: "100",
      },
      {
        id: "actions",
        label: t("manageQuizzes.actionsTableHeader"),
        align: "center",
        width: "250",
        render: (row: IInstructorQuiz["items"][number]) => (
          <Box display="flex" className="items-center justify-center" gap={1}>
            <EditMenu row={row} />

            <DeleteQuiz quizId={row._id} />

            <Button
              variant="outlined"
              size="small"
              component={Link}
              to={`/instructor/quizzes/${row._id}/submissions`}
            >
              {t("manageQuizzes.submissionsButtonText")}
            </Button>
          </Box>
        ),
      },
    ],
    [statusMap, t]
  );
  return columns;
}

export default useQuizzesColumns;

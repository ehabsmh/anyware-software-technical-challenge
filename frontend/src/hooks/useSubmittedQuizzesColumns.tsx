import { useTranslation } from "react-i18next";
import type { IQuizSubmissionPopulated } from "../interfaces/quiz";
import { format } from "date-fns";
import { useMemo } from "react";

function useSubmittedQuizzesColumns() {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        id: "course",
        label: t("submittedQuizzes.courseTableHeader"),
        render: (row: IQuizSubmissionPopulated) => row.quizId.course.name,
      },
      {
        id: "topic",
        label: t("submittedQuizzes.topicTableHeader"),
        render: (row: IQuizSubmissionPopulated) => row.quizId.topic,
      },
      {
        id: "score",
        label: t("submittedQuizzes.scoreTableHeader"),
        render: (row: IQuizSubmissionPopulated) =>
          `${row.score}/${row.totalPoints}`,
      },
      {
        id: "numNotes",
        label: t("submittedQuizzes.numNotesTableHeader"),
        render: (row: IQuizSubmissionPopulated) =>
          row.answers
            .filter((answer) => answer.instructorNote)
            .reduce((acc, curr) => (curr.instructorNote ? acc + 1 : acc), 0),
      },
      {
        id: "correctedAt",
        label: t("submittedQuizzes.correctedAtTableHeader"),
        render: (row: IQuizSubmissionPopulated) =>
          row.correctedAt
            ? format(new Date(row.correctedAt), "MM/dd/yyyy")
            : "Not yet",
      },
    ],
    [t]
  );

  return columns;
}

export default useSubmittedQuizzesColumns;

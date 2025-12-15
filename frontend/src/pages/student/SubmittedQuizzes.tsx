import { useTranslation } from "react-i18next";
import { useStudentSubmissions } from "../../hooks/useQuizzes";
import type { IQuizSubmissionPopulated } from "../../interfaces/quiz";
import GenericTable from "../../ui/GenericTable";
import TableSkeleton from "../../skeletons/tableSkeleton";
import { format } from "date-fns";
import { useState } from "react";

function SubmittedQuizzes() {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading: studentSubmissionsLoading } = useStudentSubmissions({
    page: currentPage,
    limit: 5,
  });

  const items = data?.items || [];
  const { page = 1, limit = 5, total = 0 } = data || {};

  const columns = [
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
  ];

  return (
    <>
      {studentSubmissionsLoading ? (
        <TableSkeleton columns={columns} rowsCount={5} limit={limit} />
      ) : (
        <GenericTable
          rows={items}
          columns={columns}
          page={page}
          limit={limit}
          total={total}
          onPageChange={(newPage) => {
            setCurrentPage(newPage);
          }}
        />
      )}
    </>
  );
}

export default SubmittedQuizzes;

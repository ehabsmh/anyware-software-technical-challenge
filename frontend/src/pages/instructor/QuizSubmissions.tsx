import { useParams } from "react-router-dom";
import { useQuizSubmissions } from "../../hooks/useQuizzes";
import GenericTable from "../../ui/GenericTable";
import { Avatar } from "@mui/material";
import { Check, Clear } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { IQuizSubmissionPopulated } from "../../interfaces/quiz";
import TableSkeleton from "../../skeletons/tableSkeleton";

function QuizSubmissions() {
  const { t } = useTranslation();

  const { id } = useParams();
  const { data: quizSubmissions, isLoading: quizSubmissionsLoading } =
    useQuizSubmissions(id || "", 1, 5);

  const items = quizSubmissions?.items || [];
  const { page = 1, limit = 5, total = 0 } = quizSubmissions || {};

  const columns = [
    {
      id: "studentName",
      label: t("quizSubmissions.studentTableHeader"),
      render: (row: IQuizSubmissionPopulated) => (
        <div className="flex gap-3 items-center">
          <Avatar
            sx={{ width: 35, height: 35 }}
            src={row.userId.avatar}
            alt={row.userId.name}
          />
          <p>{row.userId.name}</p>
        </div>
      ),
    },
    {
      id: "submittedAt",
      label: t("quizSubmissions.submittedAtTableHeader"),
      render: (row: IQuizSubmissionPopulated) => row.submittedAt,
    },
    {
      id: "score",
      label: t("quizSubmissions.scoreTableHeader"),
      render: (row: IQuizSubmissionPopulated) =>
        `${row.score}/${row.totalPoints}`,
    },
    {
      id: "isCorrected",
      label: t("quizSubmissions.correctedTableHeader"),
      render: (row: IQuizSubmissionPopulated) =>
        row.isCorrected ? <Check /> : <Clear />,
    },
  ];

  return (
    <>
      {quizSubmissionsLoading ? (
        <TableSkeleton columns={columns} rowsCount={4} limit={limit} />
      ) : (
        <GenericTable
          rows={items}
          columns={columns}
          page={page}
          limit={limit}
          total={total}
          onPageChange={() => {}}
        />
      )}
    </>
  );
}

export default QuizSubmissions;

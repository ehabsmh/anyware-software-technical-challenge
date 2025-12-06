import { useParams } from "react-router-dom";
import { useQuizSubmissions } from "../../hooks/useQuizzes";
import GenericTable from "../../ui/GenericTable";
import { Avatar } from "@mui/material";
import type { IQuizSubmissionPopulated } from "../../interfaces/quiz";

const columns = [
  {
    id: "studentName",
    label: "Student",
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
    label: "Submitted At",
    render: (row: IQuizSubmissionPopulated) => row.submittedAt,
  },
  {
    id: "score",
    label: "Score",
    render: (row: IQuizSubmissionPopulated) =>
      `${row.score}/${row.totalPoints}`,
  },
  {
    id: "isCorrected",
    label: "Corrected",
    render: (row: IQuizSubmissionPopulated) => (row.isCorrected ? "Yes" : "No"),
  },
];

function QuizSubmissions() {
  const { id } = useParams();
  const { data: quizSubmissions } = useQuizSubmissions(id || "", 1, 5);
  if (!quizSubmissions) return null;

  console.log(quizSubmissions);

  const { items, limit, page, total } = quizSubmissions;

  return (
    <GenericTable
      columns={columns}
      rows={items}
      page={page}
      limit={limit}
      total={total}
      onPageChange={() => {}}
    />
  );
}

export default QuizSubmissions;

import { useStudentSubmissions } from "../../hooks/useQuizzes";
import type { IQuizSubmissionPopulated } from "../../interfaces/quiz";
import GenericTable from "../../ui/GenericTable";

const columns = [
  {
    id: "course",
    label: "Course",
    render: (row: IQuizSubmissionPopulated) => row.quizId.course.name,
  },
  {
    id: "topic",
    label: "Quiz Topic",
    render: (row: IQuizSubmissionPopulated) => row.quizId.topic,
  },
  {
    id: "score",
    label: "score",
    render: (row: IQuizSubmissionPopulated) =>
      `${row.score}/${row.totalPoints}`,
  },
  {
    id: "numNotes",
    label: "Notes",
    render: (row: IQuizSubmissionPopulated) =>
      row.answers
        .filter((answer) => answer.instructorNote)
        .reduce((acc, curr) => (curr.instructorNote ? acc + 1 : acc), 0),
  },
  {
    id: "correctedAt",
    label: "Corrected At",
    render: (row: IQuizSubmissionPopulated) =>
      row.correctedAt ? row.correctedAt : "Not yet",
  },
];
function SubmittedQuizzes() {
  const { data } = useStudentSubmissions();

  if (!data) return <p>No submissions found.</p>;

  const { items, limit, page, total } = data;

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

export default SubmittedQuizzes;

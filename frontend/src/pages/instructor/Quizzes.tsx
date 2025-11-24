import { Box } from "@mui/material";
import { useInstructorQuizzes } from "../../hooks/useQuizzes";
import GenericTable from "../../ui/GenericTable";
import EditMenu from "../../features/quizzes/manage/EditMenu";
import type { IInstructorQuiz } from "../../interfaces/quiz";
import DeleteQuiz from "../../features/quizzes/manage/DeleteQuiz";

const columns = [
  { id: "topic", label: "Topic" },
  {
    id: "course",
    label: "Course",
    render: (row: IInstructorQuiz["items"][number]) => row.course.name,
  },
  {
    id: "dueDate",
    label: "Due Date",
    render: (row: IInstructorQuiz["items"][number]) =>
      new Date(row.dueDate).toLocaleDateString(),
  },
  { id: "status", label: "Status" },
  { id: "numQuestions", label: "Questions" },
  {
    id: "actions",
    label: "Actions",
    render: (row: IInstructorQuiz["items"][number]) => (
      <Box display="flex" gap={1}>
        <EditMenu row={row} />

        <DeleteQuiz quizId={row._id} />
      </Box>
    ),
  },
];

function Quizzes() {
  const { data: quizzes } = useInstructorQuizzes(1, 5);
  const items = quizzes?.items || [];

  const { page = 1, limit = 5, total = 0 } = quizzes || {};

  return (
    <GenericTable<IInstructorQuiz["items"][number]>
      columns={columns}
      rows={items}
      page={page}
      limit={limit}
      total={total}
      onPageChange={() => {}}
    />
  );
}

export default Quizzes;

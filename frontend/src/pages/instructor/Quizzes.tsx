import { Box, Button } from "@mui/material";
import { useInstructorQuizzes } from "../../hooks/useQuizzes";
import GenericTable, { type Column } from "../../ui/GenericTable";
import EditMenu from "../../features/quizzes/manage/EditMenu";
import type { IInstructorQuiz } from "../../interfaces/quiz";
import DeleteQuiz from "../../features/quizzes/manage/DeleteQuiz";
import Search from "../../ui/Search";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";

const columns: Column<IInstructorQuiz["items"][number]>[] = [
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
    align: "center",
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
          Submissions
        </Button>
      </Box>
    ),
  },
];

function Quizzes() {
  const [searchTopic, setSearchTopic] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  const [debouncedTopic] = useDebounce(searchTopic, 800);
  const [debouncedCourse] = useDebounce(searchCourse, 800);

  const { data: quizzes } = useInstructorQuizzes({
    page: 1,
    limit: 5,
    topic: debouncedTopic,
    course: debouncedCourse,
  });
  const items = quizzes?.items || [];

  const { page = 1, limit = 5, total = 0 } = quizzes || {};

  return (
    <>
      <div className="flex md:gap-16 gap-4 md:flex-row flex-col mb-4">
        <Search
          label="Search Topic"
          value={searchTopic}
          onChange={(e) => setSearchTopic(e.target.value)}
        />
        <Search
          label="Search Course"
          value={searchCourse}
          onChange={(e) => setSearchCourse(e.target.value)}
        />
      </div>
      <GenericTable<IInstructorQuiz["items"][number]>
        columns={columns}
        rows={items}
        page={page}
        limit={limit}
        total={total}
        onPageChange={() => {}}
      />
    </>
  );
}

export default Quizzes;

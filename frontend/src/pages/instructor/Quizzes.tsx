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
import { useTranslation } from "react-i18next";
import TableSkeleton from "../../skeletons/tableSkeleton";

function Quizzes() {
  const { t } = useTranslation();
  const [searchTopic, setSearchTopic] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  const [debouncedTopic] = useDebounce(searchTopic, 800);
  const [debouncedCourse] = useDebounce(searchCourse, 800);

  const [currentPage, setCurrentPage] = useState(1);

  const { data: quizzes, isLoading: quizzesLoading } = useInstructorQuizzes({
    page: currentPage,
    limit: 2,
    topic: debouncedTopic,
    course: debouncedCourse,
  });
  const items = quizzes?.items || [];

  const statusMap: Record<string, string> = {
    published: t("manageQuizzes.statusPublished"),
    draft: t("manageQuizzes.statusDraft"),
  };

  const { page = 1, limit = 5, total = 0 } = quizzes || {};

  const columns: Column<IInstructorQuiz["items"][number]>[] = [
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
  ];

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

      {quizzesLoading ? (
        <TableSkeleton columns={columns} rowsCount={6} limit={limit} />
      ) : (
        <GenericTable<IInstructorQuiz["items"][number]>
          rows={items}
          columns={columns}
          page={page}
          limit={limit}
          total={total}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </>
  );
}

export default Quizzes;

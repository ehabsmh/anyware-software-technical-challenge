import { useInstructorQuizzes } from "../../hooks/useQuizzes";
import GenericTable from "../../ui/GenericTable";
import type { IInstructorQuiz } from "../../interfaces/quiz";
import Search from "../../ui/Search";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import TableSkeleton from "../../skeletons/tableSkeleton";
import useQuizzesColumns from "../../hooks/useQuizzesColumns";

function Quizzes() {
  const [searchTopic, setSearchTopic] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  const [debouncedTopic] = useDebounce(searchTopic, 800);
  const [debouncedCourse] = useDebounce(searchCourse, 800);

  const [currentPage, setCurrentPage] = useState(1);

  const { data: quizzes, isLoading: quizzesLoading } = useInstructorQuizzes({
    page: currentPage,
    limit: 8,
    topic: debouncedTopic,
    course: debouncedCourse,
  });
  const items = quizzes?.items || [];

  const { page = 1, limit = 5, total = 0 } = quizzes || {};

  const columns = useQuizzesColumns();

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTopic, debouncedCourse]);

  return (
    <div className="h-[calc(100vh-86px)] overflow-y-auto md:p-8 bg-main">
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
    </div>
  );
}

export default Quizzes;

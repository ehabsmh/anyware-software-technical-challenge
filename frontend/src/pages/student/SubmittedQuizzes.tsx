import { useStudentSubmissions } from "../../hooks/useQuizzes";
import GenericTable from "../../ui/GenericTable";
import TableSkeleton from "../../skeletons/tableSkeleton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSubmittedQuizzesColumns from "../../hooks/useSubmittedQuizzesColumns";

function SubmittedQuizzes() {
  const navigate = useNavigate();

  const columns = useSubmittedQuizzesColumns();

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading: studentSubmissionsLoading } = useStudentSubmissions({
    page: currentPage,
    limit: 5,
  });

  const items = data?.items || [];
  const { page = 1, limit = 5, total = 0 } = data || {};

  return (
    <div className="h-[calc(100vh-86px)] overflow-y-auto md:p-8 bg-main">
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
          onClick={(rowId) => navigate(`/student/submitted-quizzes/${rowId}`)}
        />
      )}
    </div>
  );
}

export default SubmittedQuizzes;

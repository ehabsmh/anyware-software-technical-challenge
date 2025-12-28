import { useNavigate, useParams } from "react-router-dom";
import { useQuizSubmissions } from "../../hooks/useQuizzes";
import GenericTable from "../../ui/GenericTable";
import TableSkeleton from "../../skeletons/tableSkeleton";
import { useState } from "react";
import useQuizSubmissionsColumns from "../../hooks/useQuizSubmissionsColumns";

function QuizSubmissions() {
  const navigate = useNavigate();
  const { id } = useParams();

  const columns = useQuizSubmissionsColumns();

  const [currentPage, setCurrentPage] = useState(1);
  const { data: quizSubmissions, isLoading: quizSubmissionsLoading } =
    useQuizSubmissions(id || "", currentPage, 5);

  const items = quizSubmissions?.items || [];
  const { page = 1, limit = 5, total = 0 } = quizSubmissions || {};

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
          onPageChange={(newPage) => {
            setCurrentPage(newPage);
          }}
          onClick={(rowId) =>
            navigate(`/instructor/quizzes/${id}/submissions/${rowId}`)
          }
        />
      )}
    </>
  );
}

export default QuizSubmissions;

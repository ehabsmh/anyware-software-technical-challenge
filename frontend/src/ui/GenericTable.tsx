/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";

export interface Column<T> {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
}

interface Props<T extends { _id: string }> {
  columns: Column<T>[];
  rows: T[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export default function GenericTable<
  T extends {
    score?: number;
    totalPoints?: number;
    _id: string;
  }
>({ columns, rows, page, limit, total, onPageChange }: Props<T>) {
  const navigate = useNavigate();
  return (
    <Box className="w-screen lg:w-auto">
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer className="overflow-x-auto">
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align || "left"}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((row) => (
                <TableRow
                  key={row._id}
                  hover={
                    row.score !== undefined && row.totalPoints !== undefined
                      ? true
                      : false
                  }
                  className={`${
                    row.score !== undefined && row.totalPoints !== undefined
                      ? "cursor-pointer"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      row.score !== undefined &&
                      row.totalPoints !== undefined
                    ) {
                      navigate(`/student/submitted-quizzes/${row._id}`);
                    }
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.id} align={col.align || "left"}>
                      {col.render ? col.render(row) : (row as any)[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[limit]}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page - 1}
          onPageChange={(_, newPage) => onPageChange(newPage + 1)}
        />
      </Paper>
    </Box>
  );
}

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

export interface Column<T> {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface Props<T extends { _id: string }> {
  columns: Column<T>[];
  rows: T[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onClick?: (rowId: string) => void;
}

export default function GenericTable<
  T extends {
    score?: number;
    totalPoints?: number;
    _id: string;
  }
>({ columns, rows, page, limit, total, onPageChange, onClick }: Props<T>) {
  return (
    <Box className="w-[calc(100vw-24px)] md:w-full lg:w-auto">
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
                  hover={onClick ? true : false}
                  className={`${onClick ? "cursor-pointer" : ""}`}
                  onClick={() => onClick && onClick(row._id)}
                >
                  {columns.map((col) => (
                    <TableCell
                      width={col.width}
                      key={col.id}
                      align={col.align || "left"}
                    >
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

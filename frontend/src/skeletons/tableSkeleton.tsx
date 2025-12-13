import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  TablePagination,
} from "@mui/material";
import type { Column } from "../ui/GenericTable";

interface TableSkeletonProps<T> {
  columns: Column<T>[];
  rowsCount?: number;
  limit?: number;
}

function TableSkeleton<T>({
  columns,
  rowsCount = 5,
  limit = 10,
}: TableSkeletonProps<T>) {
  return (
    <Box className="w-screen lg:w-auto">
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer className="overflow-x-auto">
          <Table>
            {/* Header */}
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align || "left"}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {Array.from({ length: rowsCount }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col) => (
                    <TableCell key={col.id} align={col.align || "left"}>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Skeleton */}
        <TablePagination
          rowsPerPageOptions={[limit]}
          component="div"
          count={0}
          rowsPerPage={limit}
          page={0}
          onPageChange={() => {}}
        />
      </Paper>
    </Box>
  );
}

export default TableSkeleton;

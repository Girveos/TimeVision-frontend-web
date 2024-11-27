import React from "react";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import "./Table.css";

const Table = ({
  headers,
  data,
  currentPage,
  totalPages,
  onPageChange,
  renderTableRow,
  showPagination = true,
}) => {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderTableRow(item))}</tbody>
      </table>

      {/* {showPagination && (
        <Stack spacing={2} className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            siblingCount={1}
            boundaryCount={1}
            hidePrevButton
            hideNextButton
            size="small"
            variant="outlined" 
            color="primary"
            shape='rounded'
          />
        </Stack>
      )} */}

      <TablePagination
        component="div"
        count={totalPages}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Table;

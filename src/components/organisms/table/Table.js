import React from "react";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import "./Table.css";

const Table = ({
  headers,
  data,
  currentPage,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  renderTableRow,
}) => {
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
      <div className="pagination-container">
        <TablePagination
          component="div"
          count={totalRows}
          page={currentPage - 1}
          onPageChange={(_, newPage) => onPageChange(newPage + 1)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) =>
            onRowsPerPageChange(parseInt(event.target.value, 10))
          }
          labelRowsPerPage="Filas por página:"
        />
      </div>
    </div>
  );
};

export default Table;

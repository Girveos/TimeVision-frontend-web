import React from 'react';
import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import './Table.css';

const Table = ({ 
  headers, 
  data, 
  currentPage, 
  totalPages, 
  onPageChange, 
  renderTableRow,
  showPagination = true
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
        <tbody>
          {data.map((item) => renderTableRow(item))}
        </tbody>
      </table>

      {showPagination && (
        <Stack spacing={2} className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            siblingCount={1}
            boundaryCount={1}
            hidePrevButton
            hideNextButton
            shape="rounded"
          />
        </Stack>
      )}
    </div>
  );
};

export default Table;
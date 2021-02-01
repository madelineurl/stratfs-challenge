import React from "react";
import PropTypes from "prop-types";

export const TableHeader = ({ selectAllRows }) => {
  return (
    <tr className="table-header">
      <th style={{ textAlign: `right` }}>
        <input
          type="checkbox"
          className="checkbox"
          data-testid="select-all"
          onClick={selectAllRows}
        />
      </th>
      <th>Creditor</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Min Pay %</th>
      <th>Balance</th>
  </tr>
  );
};


TableHeader.propTypes = {
  selectAllRows: PropTypes.func.isRequired,
};

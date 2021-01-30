import React from "react";
import PropTypes from "prop-types";

export const TableButtons = ({ addRow, removeRows }) => {
  return (
    <tr>
      <td>
        <button onClick={addRow}>Add Debt</button>
      </td>
      <td>
        <button onClick={removeRows}>Remove Debt</button>
      </td>
    </tr>
  );
};

TableButtons.propTypes = {
  addRow: PropTypes.func.isRequired,
  removeRows: PropTypes.func.isRequired
};

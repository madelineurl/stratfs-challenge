import React from "react";
import PropTypes from "prop-types";

export const TableButtons = ({ addRow, removeRows }) => {
  return (
    <div>
      <div>
        <button onClick={addRow}>Add Debt</button>
      </div>
      <div>
        <button onClick={removeRows}>Remove Debt</button>
      </div>
    </div>
  );
};

TableButtons.propTypes = {
  addRow: PropTypes.func.isRequired,
  removeRows: PropTypes.func.isRequired
};

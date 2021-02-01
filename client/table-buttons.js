import React from "react";
import PropTypes from "prop-types";

export const TableButtons = ({ addRow, removeRows }) => {
  return (
    <div className="buttons">
      <button onClick={removeRows}>
        Remove Debt
      </button>
      <button
        onClick={addRow}>
          Add Debt
      </button>
    </div>
  );
};

TableButtons.propTypes = {
  addRow: PropTypes.func.isRequired,
  removeRows: PropTypes.func.isRequired
};

import React from "react";
import PropTypes from "prop-types";

export const Totals = ({ getTotalBalance, selected, clientData }) => {
  return (
    <>
      <tr>
        <td>Total Balance</td>
        <td>{getTotalBalance(selected)}</td>
      </tr>
      <tr>
        <td>Total Row Count: {clientData.length}</td>
        <td>Check Row Count: {selected.length}</td>
      </tr>
    </>
  );
};


Totals.propTypes = {
  getTotalBalance: PropTypes.func.isRequired,
  clientData: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired
};


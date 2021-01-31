import React from "react";
import PropTypes from "prop-types";

export const Totals = ({ getTotalBalance, selected, clientData }) => {
  return (
    <>
      <div>
        <div className="totals-left">Total Balance</div>
        <div>{getTotalBalance(selected)}</div>
      </div>
      <div>
        <div>Total Row Count: {clientData.length}</div>
        <div>Check Row Count: {selected.length}</div>
      </div>
    </>
  );
};


Totals.propTypes = {
  getTotalBalance: PropTypes.func.isRequired,
  clientData: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired
};


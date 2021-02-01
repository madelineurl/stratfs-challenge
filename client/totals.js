import React from "react";
import PropTypes from "prop-types";
import { roundTwoDecimals } from "./utils/helpers";

export const Totals = ({ getTotalBalance, selected, clientData }) => {
  return (
    <>
      <div className="balance totals">
        <div>
          <strong>
           <label>
                Total Balance
            </label>
          </strong>
        </div>
        <div className="total-balance" data-testid="total-balance">
          {roundTwoDecimals(getTotalBalance(selected))}
        </div>
      </div>
      <div className="row totals">
        <div>
          <strong>
            Total Row Count: {clientData.length}
          </strong>
        </div>
        <div>
          <strong>
            Check Row Count: {selected.length}
          </strong>
        </div>
      </div>
    </>
  );
};


Totals.propTypes = {
  getTotalBalance: PropTypes.func.isRequired,
  clientData: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired
};


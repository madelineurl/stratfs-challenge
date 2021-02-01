import React from "react";
import PropTypes from "prop-types";
import { roundTwoDecimals } from "./utils/helpers";

export const DataList = ({ clientData, selectRow, checkIfSelected, selected }) => {
  return (
    <>
      {
        clientData.map(client => (
          <tr
            key={client.id}
            role="listitem" className="data-row"
          >
            <th>
              <input
                type="checkbox"
                className="checkbox"
                role="option"
                onChange={() => selectRow(client)}
                checked={checkIfSelected(client, selected)}
              />
            </th>
            <td>{client.creditorName}</td>
            <td>{client.firstName}</td>
            <td>{client.lastName}</td>
            <td>{roundTwoDecimals(client.minPaymentPercentage)}%</td>
            <td>{roundTwoDecimals(client.balance)}</td>
          </tr>
        ))
      }
    </>
  );
};

DataList.propTypes = {
  clientData: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  selectRow: PropTypes.func.isRequired,
  checkIfSelected: PropTypes.func.isRequired,
};

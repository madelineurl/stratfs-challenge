import React from "react";
import PropTypes from "prop-types";

export const DataList = ({ clientData, selectRow, checkIfSelected, selected }) => {
  return (
    <>
      {
        clientData.map(client => (
          <tr key={client.id} role="rowgroup">
            <td>
              <input
                type="checkbox"
                onChange={() => selectRow(client)}
                checked={checkIfSelected(client, selected)}
                className="checkbox"
              />
            </td>
            <td>{client.creditorName}</td>
            <td>{client.firstName}</td>
            <td>{client.lastName}</td>
            <td>{client.minPaymentPercentage}%</td>
            <td>{client.balance}.00</td>
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

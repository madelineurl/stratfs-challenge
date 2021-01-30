import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [clientData, setClientData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
        setClientData(data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);

  const selectRow = (rowData) => {
    // check if the row has already been selected
    // if so, filter it out of the selected values
    // otherwise, add it to selected values
    const exists = checkIfSelected(rowData);
    if (exists) {
      setSelected(selected.filter(row => row.id !== rowData.id));
    } else {
      setSelected([...selected, rowData]);
    }
  };

  const selectAllRows = () => {
    // if all of the rows are selected, uncheck them all
    // otherwise, select all of the rows
    if (selected.length === clientData.length) setSelected([]);
    else setSelected([...clientData]);
  };

  // utility function to check if a row is selected
  // the return value will help keep the checkbox in sync with selected state
  function checkIfSelected(rowData) {
    const exists = selected.filter(row => row.id === rowData.id);
    return exists.length > 0;
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th><input type="checkbox" onClick={selectAllRows}/></th>
            <th>Creditor</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Min Pay %</th>
            <th>Balance</th>
          </tr>
          {
            clientData.map(client => (
              <tr key={client.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => selectRow(client)}
                    checked={checkIfSelected(client)}
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
          <tr>
            <td>
              <button>Add Debt</button>
            </td>
            <td>
              <button>Remove Debt</button>
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td>-Total Amount Here-</td>
          </tr>
          <tr>
            <td>Total Row Count: {clientData.length}</td>
            <td>Check Row Count: {selected.length}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default App;

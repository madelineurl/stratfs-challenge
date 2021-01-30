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
    // check if the row has already been selected by filtering for a matching ID
    const exists = selected.filter(row => row.id === rowData.id);
    // if the resulting array isn't empty, filter it out of the selected values
    // otherwise, add it to selected values
    if (exists.length) {
      setSelected(selected.filter(row => row.id !== rowData.id));
    } else {
      setSelected([...selected, rowData]);
    }
  };
  console.log(selected)
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th><input type="checkbox" /></th>
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
                  <input type="checkbox" onClick={() => selectRow(client)} />
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

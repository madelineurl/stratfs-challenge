import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkIfSelected, getTotalBalance } from "../utils/helpers";

const App = () => {
  const [clientData, setClientData] = useState([]);
  const [selected, setSelected] = useState([]);
  let nextId = 0;
  const [newRow, setNewRow] = useState({
    id: nextId,
    creditorName: '',
    firstName: '',
    lastName: '',
    minPaymentPercentage: 0,
    balance: 0
  });

  // load the data when the component mounts
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
    nextId = clientData.length + 1;
  }, []);

  // check if the row has already been selected - if so, filter it out of the selected values
  // otherwise, add it to selected values
  const selectRow = (rowData) => {
    const exists = checkIfSelected(rowData, selected);
    if (exists) {
      setSelected(selected.filter(row => row.id !== rowData.id));
    } else {
      setSelected([...selected, rowData]);
    }
  };

  // if all of the rows are selected, uncheck them all - otherwise, select all of the rows
  const selectAllRows = () => {
    if (selected.length === clientData.length) setSelected([]);
    else setSelected([...clientData]);
  };

  // ensure the user has selected rows to remove, then remove all rows with matching ids from selected state
  const removeRows = () => {
    if (!selected.length) alert('Please select one or more rows to remove');
    const allIds = clientData.map(row => row.id);
    const selectedIds = selected.map(row => row.id);
    const remainingIds = allIds.filter(id => !selectedIds.includes(id));
    const remainingRows = [];
    clientData.forEach(row => {
      if (remainingIds.includes(row.id)) remainingRows.push(row);
    });
    setClientData(remainingRows);
    setSelected([]);
  };

  const handleChange = (evt) => {
    setNewRow(prev => ({
      ...prev,
      [evt.target.name]: evt.target.value
    }));
  };

  const addRow = () => {
    setClientData([...clientData, newRow]);
    nextId++;
    setNewRow({
      id: nextId,
      creditorName: '',
      firstName: '',
      lastName: '',
      minPaymentPercentage: 0,
      balance: 0
    });
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>
              <input type="checkbox" onClick={selectAllRows}/>
            </th>
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
                    checked={checkIfSelected(client, selected)}
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
            <td></td>
            <td><input name="creditorName" onChange={handleChange}/></td>
            <td><input name="firstName" onChange={handleChange}/></td>
            <td><input name="lastName" onChange={handleChange}/></td>
            <td><input name="minPaymentPercentage" onChange={handleChange}/></td>
            <td><input name="balance" onChange={handleChange}/></td>
          </tr>
          <tr>
            <td>
              <button onClick={addRow}>Add Debt</button>
            </td>
            <td>
              <button onClick={removeRows}>Remove Debt</button>
            </td>
          </tr>
          <tr>
            <td>Total Balance</td>
            <td>{getTotalBalance(selected)}</td>
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

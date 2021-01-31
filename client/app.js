import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from "react";
import { TableHeader } from "./table-header";
import { DataList } from "./data-list";
import { NewRow } from "./new-row";
import { TableButtons } from "./table-buttons";
import { Totals } from "./totals";
import { checkIfSelected, getTotalBalance } from "./utils/helpers";
import { fetchData } from "./utils/fetch-data";

const App = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    clientData: []
  });

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
    async function setData() {
      try {
        setState({ loading: true, clientData: [], error: null });
        const { data } = await fetchData();
        setState({ loading: false, clientData: data, error: null });
      } catch (err) {
        setState({ loading: false, clientData: [], error: err });
        console.error(err);
      }
    }

    setData();
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

  // ensure the user has selected some rows to remove
  // then remove all rows with matching ids from selected state
  const removeRows = () => {
    if (!selected.length) alert('Please select one or more rows to remove');
    const allIds = clientData.map(row => row.id);
    const selectedIds = selected.map(row => row.id);
    const remainingIds = allIds.filter(id => !selectedIds.includes(id));
    const remainingRows = [];

    clientData.forEach(row => {
      if (remainingIds.includes(row.id)) remainingRows.push(row);
    });

    setState({clientData: remainingRows});
    setSelected([]);
  };

  const handleChange = (evt) => {
    setNewRow(prev => ({
      ...prev,
      [evt.target.name]: evt.target.value
    }));
  };

  const addRow = () => {
    if (!newRow.creditor) alert('Please enter a creditor name');
    setState({ clientData: [...clientData, newRow] });
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

  const { loading, error, clientData } = state;
  return (
    <>
       <div role="alert" aria-live="polite">
        {
         loading ? 'Loading...' : error ? error.message : null
        }
      </div>
      <table>
        <tbody>
          <TableHeader selectAllRows={selectAllRows} />
          <DataList
            role="listitems"
            clientData={clientData}
            selected={selected}
            selectRow={selectRow}
            checkIfSelected={checkIfSelected}
          />
         <NewRow handleChange={handleChange} />
         <TableButtons addRow={addRow} removeRows={removeRows} />
         <Totals
            getTotalBalance={getTotalBalance}
            clientData={clientData}
            selected={selected}
          />
        </tbody>
      </table>
    </>
  );
};

export default App;

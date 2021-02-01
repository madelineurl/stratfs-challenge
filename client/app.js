import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { fetchData } from "./utils/fetch-data";

const App = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    clientData: []
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
      }
    }

    setData();
  }, []);

  const { loading, error, clientData } = state;
  return (
    <>
       <div role="alert" aria-live="polite">
        {
         loading ?
          'Loading...' : error ?
            error.message : null
        }
      </div>
      {
        clientData.length && <DataTable data={clientData} setState={setState} />
      }
    </>
  );
};

export default App;

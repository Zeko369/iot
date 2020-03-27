import React, { useReducer, useEffect } from "react";
import EntriesTable from "./EntriesTable";
import { reducer, initState } from "./useData";
import { Action } from "./ts";

import "./App.scss";

const get = (dispatch: React.Dispatch<Action>) => () => {
  dispatch({ type: "loading" });
  return fetch("http://localhost:5000")
    .then(res => res.json())
    .then(data => dispatch({ type: "success", payload: data }))
    .catch(err => dispatch({ type: "error", payload: err }));
};

function App() {
  const [{ loading, data, error }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    get(dispatch)();
  }, []);

  return (
    <div className="App">
      <button className="reload btn" onClick={get(dispatch)}>
        Reload
      </button>
      <h1>IOT:</h1>
      {error ? (
        <>
          <h1>Error...</h1>
          <p>{JSON.stringify(error)}</p>
        </>
      ) : (
        <div>
          <h1>Data: </h1>
          <EntriesTable entries={data} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default App;

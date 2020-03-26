import React, { useReducer, useEffect } from "react";
import "./App.css";
import Entry from "./Entry";
import EntriesTable from "./Entry";

type Action =
  | { type: "loading" }
  | { type: "error"; payload: string }
  | { type: "success"; payload: any[] };

enum DataState {
  idle,
  loading,
  error
}

export interface IEntry {
  _id: string;
  temp: number;
  hum: number;
  lux: number;
  date: string;
  __v: number;
}

interface IState {
  state: DataState;
  data: IEntry[];
  error: string;
}

const initState: IState = {
  state: DataState.idle,
  data: [],
  error: ""
};

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "loading":
      return { ...state, state: DataState.loading, error: "" };
    case "error":
      return { ...state, error: action.payload, state: DataState.error };
    case "success":
      return { ...state, data: action.payload, state: DataState.idle };
    default:
      return state;
  }
};

const refetch = (dispatch: React.Dispatch<Action>) => async () => {
  dispatch({ type: "loading" });
  return fetch("http://localhost:5000")
    .then(res => res.json())
    .then(data => dispatch({ type: "success", payload: data }))
    .catch(err => dispatch({ type: "error", payload: err }));
};

function App() {
  const [{ state, data, error }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch(dispatch)();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Data: </h1>
      {state === DataState.error ? (
        <>
          <h1>Error...</h1>
          <p>{JSON.stringify(error)}</p>
        </>
      ) : (
        <EntriesTable entries={data} />
      )}

      {state === DataState.loading && <h3>Loading...</h3>}
    </div>
  );
}

export default App;

import React, { useReducer, useEffect, useState } from "react";
import EntriesTable from "./EntriesTable";
import { reducer, initState } from "./useData";
import { Action } from "./ts";

import "./App.scss";
import StatsCard from "./StatsCard";

const get = (dispatch: React.Dispatch<Action>) => () => {
  dispatch({ type: "loading" });
  return fetch("http://localhost:5000")
    .then(res => res.json())
    .then(data => dispatch({ type: "success", payload: data }))
    .catch(err => dispatch({ type: "error", payload: err }));
};

const time = (val: string) => {
  const date = new Date(val);
  let diff = (Date.now() - date.getTime()) / 1000 / 60; // minutes

  if (diff < 60) {
    const out = Math.floor(diff);
    return `${out} minute${out > 1 ? "s" : ""} ago`;
  } else if (diff / 60 < 24) {
    const out = Math.floor(diff / 60);
    return `${out} hour${out > 1 ? "s" : ""} ago`;
  }

  return `On ${date.toLocaleString()}`;
};

const formatTemp = (temp: number) => `${temp}°C`;
const formatHum = (hum: number) => `${hum}%`;

function App() {
  const [light, setLight] = useState(true);
  const [{ loading, data, error }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    get(dispatch)();
  }, []);

  return (
    <div className="App">
      <button className="reload btn" onClick={get(dispatch)}>
        Reload
      </button>
      <button
        className="toggle btn"
        onClick={() => document.documentElement.classList.toggle("white")}
      >
        Toggle
      </button>
      <h1>IOT:</h1>
      {error ? (
        <>
          <h1>Error...</h1>
          <p>{JSON.stringify(error)}</p>
        </>
      ) : (
        <div>
          {!data || !data[0] ? (
            <h3>Loading...</h3>
          ) : (
            <header>
              <StatsCard
                title="Temperature"
                time={time(data[0].date)}
                value={formatTemp(data[0].temp)}
                white
              />
              <StatsCard
                title="Humidity"
                time={time(data[0].date)}
                value={formatHum(data[0].hum)}
                color="#59dbe8"
              />
            </header>
          )}
          <h1>Data: </h1>
          <EntriesTable entries={data} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default App;

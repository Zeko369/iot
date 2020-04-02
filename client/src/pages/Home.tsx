import React, { useReducer, useEffect } from "react";
import { reducer, initState } from "../hooks/useData";
import { Action } from "../@types";

import StatsCard from "../components/StatsCard";
import EntriesTable from "../components/EntriesTable";
import styled from "styled-components";
import Button from "../components/Button";

const get = (dispatch: React.Dispatch<Action>) => () => {
  dispatch({ type: "loading" });
  return fetch("http://localhost:5000")
    .then((res) => res.json())
    .then((data) => dispatch({ type: "success", payload: data }))
    .catch((err) => dispatch({ type: "error", payload: err }));
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

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const HomeContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 900px;
`;

function App() {
  const [{ loading, data, error }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    get(dispatch)();
  }, []);

  return (
    <HomeContainer>
      <Button className="reload" onClick={get(dispatch)}>
        Reload
      </Button>
      <Button className="toggle" onClick={() => document.documentElement.classList.toggle("black")}>
        Toggle
      </Button>
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
            <Header>
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
            </Header>
          )}
          <h1>Data: </h1>
          <EntriesTable entries={data} loading={loading} />
        </div>
      )}
    </HomeContainer>
  );
}

export default App;

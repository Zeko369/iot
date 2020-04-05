import React, { useReducer, useEffect } from "react";
import styled from "styled-components";

import { reducer, initState, get } from "../hooks/useData";
import StatsCard from "../components/StatsCard";
import EntriesTable from "../components/EntriesTable";
import Button from "../components/Button";
import { time, formatTemp, formatHum } from "../helpers/format";

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

function Home() {
  const [{ loading, data, error }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const interval = setInterval(get(dispatch), 1000);
    return () => clearInterval(interval);
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

export default Home;

import React from "react";
import styled from "styled-components";

interface IStatsCardProps {
  title: string;
  value: string;
  time: string;
  color?: string;
  white?: boolean;
}

const StatusCardContainer = styled.div`
  padding: 20px;
  border-radius: 8px;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &.white {
    h1,
    h3,
    p {
      color: #fff;
    }
  }

  h1,
  h3,
  p {
    margin: 0;
    padding: 0;
    color: black;
  }

  h1 {
    font-weight: 700;
  }

  p {
    font-size: 0.7rem;
  }
`;

const StatsCard: React.FC<IStatsCardProps> = ({ title, value, time, color, white }) => {
  return (
    <StatusCardContainer
      className={`status-card ${white ? "white" : ""}`}
      style={{ backgroundColor: color || "#29649d" }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
      <p>{time}</p>
    </StatusCardContainer>
  );
};

export default StatsCard;

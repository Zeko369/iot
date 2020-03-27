import React from "react";
import "./StatusCard.style.scss";

interface IStatsCardProps {
  title: string;
  value: string;
  time: string;
  color?: string;
  white?: boolean;
}

const StatsCard: React.FC<IStatsCardProps> = ({
  title,
  value,
  time,
  color,
  white
}) => {
  return (
    <div
      className={`status-card ${white ? "white" : ""}`}
      style={{ backgroundColor: color || "#29649d" }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
      <p>{time}</p>
    </div>
  );
};

export default StatsCard;

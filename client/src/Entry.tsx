import React from "react";
import { IEntry } from "./App";

interface IEntriesTableProps {
  entries: IEntry[];
}

const getColumns = (row: IEntry): (keyof IEntry)[] => {
  return (Object.keys(row) as (keyof IEntry)[]).filter(
    column => !["_id", "__v"].includes(column)
  );
};

const EntriesTable: React.FC<IEntriesTableProps> = ({ entries }) => {
  if (!entries || !entries[0]) {
    return <h2>No entries</h2>;
  }

  return (
    <table>
      <thead>
        <tr>
          {getColumns(entries[0]).map(column => (
            <td key={column}>{column}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map(row => (
          <tr>
            {getColumns(row).map(column => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
        <tr></tr>
      </tbody>
    </table>
  );
};

export default EntriesTable;

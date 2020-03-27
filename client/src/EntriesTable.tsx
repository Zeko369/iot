import React from "react";
import { IEntry } from "./ts";

interface IEntriesTableProps {
  entries: IEntry[];
  loading: boolean;
}

const getColumns = (row: IEntry): (keyof IEntry)[] => {
  return (Object.keys(row) as (keyof IEntry)[]).filter(
    column => !["_id", "__v"].includes(column)
  );
};

const EntriesTable: React.FC<IEntriesTableProps> = ({ entries, loading }) => {
  if (!entries || !entries[0]) {
    return <h2>No entries</h2>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {getColumns(entries[0]).map(column => (
              <td key={column}>{column.toUpperCase()}</td>
            ))}
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {entries.map(row => (
              <tr key={row._id}>
                {getColumns(row).map(column => {
                  if (column === "date") {
                    return (
                      <td key={`${row._id}-${column}`}>
                        {new Date(row[column]).toUTCString().slice(0, -4)}
                      </td>
                    );
                  }

                  return <td key={`${row._id}-${column}`}>{row[column]}</td>;
                })}
              </tr>
            ))}
            <tr></tr>
          </tbody>
        )}
      </table>
      {loading && <h3>Loading...</h3>}
    </>
  );
};

export default EntriesTable;

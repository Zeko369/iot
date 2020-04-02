import React from "react";
import styled from "styled-components";

import { IEntry } from "../@types";

interface IEntriesTableProps {
  entries: IEntry[];
  loading: boolean;
}

const getColumns = (row: IEntry): (keyof IEntry)[] => {
  return (Object.keys(row) as (keyof IEntry)[]).filter(
    (column) => !["_id", "__v"].includes(column)
  );
};

const Table = styled.table`
  width: 100%;
  border: none;
  border-collapse: collapse;

  thead > tr > td {
    font-weight: 700;
  }

  th,
  td {
    border-bottom: 1px solid #adadad;
    padding: 5px 10px;
  }
`;

const EntriesTable: React.FC<IEntriesTableProps> = ({ entries, loading }) => {
  if (!entries || !entries[0]) {
    return <h2>No entries</h2>;
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            {getColumns(entries[0]).map((column) => (
              <td key={column}>{column.toUpperCase()}</td>
            ))}
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {entries.map((row) => (
              <tr key={row._id}>
                {getColumns(row).map((column) => {
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
      </Table>
      {loading && <h3>Loading...</h3>}
    </>
  );
};

export default EntriesTable;

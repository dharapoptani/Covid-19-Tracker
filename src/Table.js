import numeral from "numeral";
import React from "react";
import "./Table.css";

const Table = ({ tableData }) => {
  return (
    <div className="app_table">
      <table>
        <thead>
          {tableData.map((country) => {
            return (
              <tr>
                <td>{country.country}</td>
                <td>
                  <strong>{numeral(country.cases).format("0,")}</strong>
                </td>
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
};

export default Table;

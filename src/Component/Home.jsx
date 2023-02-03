import React, { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import Filter from "./Filter";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "https://kitsu.io/api/edge/anime";

    axios
      .get(url)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Titre",
        accessor: (row) =>
          (row.attributes && row.attributes.titles.en) || "Pas disponible",
      },
      {
        Header: "Titre en japonnais",
        accessor: (row) =>
          (row.attributes && row.attributes.titles.ja_jp) || "Pas disponible",
      },
      {
        Header: "Age recommandé",
        accessor: (row) =>
          (row.attributes && row.attributes.ageRatingGuide) || "Pas disponible",
      },
      {
        Header: "Date de sortie",
        accessor: (row) =>
          (row.attributes && row.attributes.startDate) || "Pas disponible",
      },
      {
        Header: "Rang",
        accessor: (row) =>
          (row.attributes && row.attributes.ratingRank) || "Pas disponible",
      },
      {
        Header: "Details",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <Link to="/">
            <button>Details</button>
          </Link>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <div className="container">
        <Filter onFilterChange={() => {}} />
        <h1 id="Catalogue">Catalogue</h1>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? " " : " ") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <button id="add_favo">Voir les favoris ❤</button>
      </div>
    </>
  );
}

export default App;

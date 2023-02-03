import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import Filter from './Filter';
import axios from 'axios';
import {  Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = 'https://kitsu.io/api/edge/anime';

    axios
      .get(url)
      .then(res => {
        setData(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Titre',
        accessor: 'attributes.titles.en',
      },
      {
        Header: 'Titre en japonnais',
        accessor: 'attributes.titles.ja_jp',
      },
      {
        Header: 'Age recommandé',
        accessor: 'attributes.ageRatingGuide',
      },
      {
        Header: 'Date de sortie',
        accessor: 'attributes.startDate',
      },
      {
        Header: 'Rang',
        accessor: 'attributes.ratingRank',
      },
      {
        Header: 'Details',
        accessor: 'id',
        Cell: ({ cell: { value } }) => (
          <Link to={`/anime/${value}`}>
            <button>Détails</button>
          </Link>
        ),
      },
      
   
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <>
    <div className='container'>

  
      <Filter />
      <h1 id='Catalogue'>Catalogue</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' '
                        : ' '
                      : ''}
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
                    
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                 
                 
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>


          <button id='add_favo'>Voir les favoris  ❤</button>
          </div>
    </>
  );
}

export default App;

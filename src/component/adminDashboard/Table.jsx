import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.fastrakconnect.com/application/get/all/1'); // Replace with your API endpoint
        const result = await response.json();
        setData(Array.isArray(result) ? result : result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Position', accessor: 'software Engineer' },
      { Header: 'Applied Date', accessor: '2024-11-16' },
      { Header: 'View More', accessor: 'view More' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-lg">
      {/* Responsive table container */}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full table-auto bg-white rounded-lg shadow"
        >
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="py-2 px-4 text-left font-semibold text-gray-700 text-sm md:text-base"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b hover:bg-gray-50"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="py-2 px-4 text-sm text-gray-600"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

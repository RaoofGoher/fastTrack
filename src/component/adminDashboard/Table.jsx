import React from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { useFetchApplicationsQuery } from '../../services/career/getAllApplicantSlice';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const { data: applications = [], error, isLoading } = useFetchApplicationsQuery();
  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Position', accessor: 'position_applied_for' },
      { Header: 'Applied Date', accessor: 'applied_date' },
      {
        Header: 'View More',
        accessor: 'view_more',
        Cell: ({ row }) => (
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleViewMore(row.original)}
          >
            View More
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: applications,
    },
    useGlobalFilter, // Enable global filtering
    useSortBy // Enable sorting
  );

  const { globalFilter } = state;

  const handleViewMore = (application) => {
    navigate(`application/${application.applicant_id}`);
  };

  const highlightText = (text, filter) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching applications.</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-lg">
      {/* Global Search Input */}
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search applications..."
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <div className="overflow-x-auto overflow-y-auto max-h-96">
        <table
          {...getTableProps()}
          className="min-w-full table-auto bg-white rounded-lg shadow"
        >
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-2 px-4 text-left font-semibold text-gray-700 text-sm md:text-base cursor-pointer"
                  >
                    {column.render('Header')}
                    <span className="ml-2">
                      {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                    </span>
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
                      {typeof cell.value === 'string'
                        ? highlightText(cell.value, globalFilter)
                        : cell.render('Cell')}
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

import React from 'react';
import { useTable } from 'react-table';
import { useFetchApplicationsQuery } from '../../services/career/getAllApplicantSlice';

const Table = () => {
  const { data: applications = [], error, isLoading } = useFetchApplicationsQuery();

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
          <button className="text-blue-500 hover:underline" onClick={() => handleViewMore(row.original)}>
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
  } = useTable({
    columns,
    data: applications,
  });

  const handleViewMore = (application) => {
    console.log('Application details:', application);
    // Add your logic to show more details
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching applications.</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-lg">
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

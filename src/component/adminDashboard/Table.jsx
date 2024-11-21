import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchApplicationsQuery } from '../../services/career/getAllApplicantSlice';

const Table = () => {
  const { data: applications = [], error, isLoading } = useFetchApplicationsQuery();
  const navigate = useNavigate();

  // State for global search filter
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Memoize filtered and sorted applications
  const filteredApplications = useMemo(() => {
    return applications.filter((application) =>
      Object.values(application).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [applications, searchTerm]);

  const sortedApplications = useMemo(() => {
    if (sortedColumn === null) return filteredApplications;
    const sorted = [...filteredApplications].sort((a, b) => {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredApplications, sortedColumn, sortDirection]);

  // Handle sorting
  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle navigation to view more details
  const handleViewMore = (application) => {
    navigate(`application/${application.applicant_id}`);
  };

  // Function to highlight the matched text
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : (
        part
      )
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching applications.</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Search applications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <div className="overflow-x-auto overflow-y-auto max-h-96">
        <table className="min-w-full table-auto bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th onClick={() => handleSort('name')} className="cursor-pointer py-2 px-4">
                Name {sortedColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('email')} className="cursor-pointer py-2 px-4">
                Email {sortedColumn === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('phone')} className="cursor-pointer py-2 px-4">
                Phone {sortedColumn === 'phone' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('address')} className="cursor-pointer py-2 px-4">
                Address {sortedColumn === 'address' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('position_applied_for')} className="cursor-pointer py-2 px-4">
                Position {sortedColumn === 'position_applied_for' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('applied_date')} className="cursor-pointer py-2 px-4">
                Applied Date {sortedColumn === 'applied_date' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4">View More</th>
            </tr>
          </thead>
          <tbody>
            {sortedApplications.map((application) => (
              <tr key={application.applicant_id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{highlightText(application.name)}</td>
                <td className="py-2 px-4">{highlightText(application.email)}</td>
                <td className="py-2 px-4">{highlightText(application.phone)}</td>
                <td className="py-2 px-4">{highlightText(application.address)}</td>
                <td className="py-2 px-4">{highlightText(application.position_applied_for)}</td>
                <td className="py-2 px-4">{highlightText(application.applied_date)}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleViewMore(application)}
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

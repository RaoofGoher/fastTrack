import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchApplicationsQuery } from '../../services/career/getAllApplicantSlice';

const ApplicationDetail = () => {
  const { id } = useParams(); // Get the application ID from the URL
  const { data: applications = [], error, isLoading } = useFetchApplicationsQuery();
  
  const [application, setApplication] = useState(null);
console.log("h1",applications)
useEffect(() => {
    if (applications.length) {
      console.log("applications", applications);
      // Compare as numbers (or strings) based on your preference
      const app = applications.find((app) => app.applicant_id === parseInt(id, 10));
      setApplication(app);
    }
  }, [id, applications]);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching application details.</div>;

  if (!application) return <div>Application not found.</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Application Details</h2>
      <p><strong>Name:</strong> {application.name}</p>
      <p><strong>Email:</strong> {application.email}</p>
      <p><strong>Phone:</strong> {application.phone}</p>
      <p><strong>Address:</strong> {application.address}</p>
      <p><strong>Position Applied For:</strong> {application.position_applied_for}</p>
      <p><strong>Applied Date:</strong> {application.applied_date}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ApplicationDetail;

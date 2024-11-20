import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchApplicationsQuery } from '../../services/career/getAllApplicantSlice';

const ApplicationDetail = () => {
  const { id } = useParams(); // Get the application ID from the URL
  const { data: applications = [], error, isLoading } = useFetchApplicationsQuery();

  const [application, setApplication] = useState(null);
  
  const BASE_URL = "https://api.fastrakconnect.com";

  useEffect(() => {
    if (applications.length) {
      const app = applications.find((app) => app.applicant_id === parseInt(id, 10));
      setApplication(app);
    }
  }, [id, applications]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching application details.</div>;
  if (!application) return <div>Application not found.</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Application Details</h2>

      {/* Personal Information Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-2">Personal Information</h3>
        <p><strong>Name:</strong> {application?.name}</p>
        <p><strong>Email:</strong> {application?.email}</p>
        <p><strong>Phone:</strong> {application?.phone}</p>
        <p><strong>Address:</strong> {application?.address}</p>
        <p><strong>Position Applied For:</strong> {application?.position_applied_for}</p>
        <p><strong>Employment Type:</strong> {application?.employment_type}</p>
        <p><strong>Preferred Shift:</strong> {application?.preferred_shift}</p>
        <p><strong>Applied Date:</strong> {application?.applied_date}</p>
      </div>

      {/* Experiences Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-2">Experiences</h3>
        {application.experiences.length ? (
          application.experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <p><strong>Job Title:</strong> {exp?.job_title}</p>
              <p><strong>Company:</strong> {exp?.company}</p>
              <p><strong>Duration From:</strong> {exp?.duration_from}</p>
              <p><strong>Duration To:</strong> {exp?.duration_to || "Present"}</p>
              <p><strong>Key Responsibilities:</strong> {exp?.key_responsibilities}</p>
            </div>
          ))
        ) : (
          <p>No experience details available.</p>
        )}
      </div>

      {/* Skills Assessment Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-2">Skills Assessment</h3>
        <p><strong>Languages:</strong> {application.skills_assessment?.languages}</p>
        <p><strong>Technical Skills:</strong> {application.skills_assessment?.tech_skills}</p>
        <p><strong>Certificates:</strong> {application.skills_assessment?.certificates}</p>
        <p><strong>Description:</strong> {application.skills_assessment?.tech_experience_description}</p>
      </div>

      {/* Education Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-2">Education</h3>
        {application.educations.length ? (
          application.educations.map((edu, index) => (
            <div key={index} className="mb-4">
              <p><strong>Degree:</strong> {edu?.degree}</p>
              <p><strong>Institute:</strong> {edu?.institute}</p>
              <p><strong>Graduation Year:</strong> {edu?.graduation_year}</p>
            </div>
          ))
        ) : (
          <p>No education details available.</p>
        )}
      </div>

      {/* Additional Information Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-2">Additional Information</h3>
        <p><strong>Why Interested:</strong> {application.additional_info?.why_interested}</p>
        <p><strong>Reason for Strong Fit:</strong> {application.additional_info?.strong_fit_reason}</p>
        <p><strong>Eligible to Work:</strong> {application.additional_info?.eligible_to_work ? "Yes" : "No"}</p>
        <p><strong>Source of Opportunity:</strong> {application.additional_info?.source_of_opportunity}</p>
      </div>

      {/* Media Uploads Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
  <h3 className="text-lg font-bold mb-2">Media Uploads</h3>
  <p>
    <strong>Video:</strong>{' '}
    {application.media_uploads?.video ? (
      <a
        href={`${BASE_URL}${application.media_uploads?.video}`}
        download
        className="text-blue-600 underline"
      >
        View Video
      </a>
    ) : (
      'No video uploaded.'
    )}
  </p>
  <p>
    <strong>Resume:</strong>{' '}
    {application.media_uploads?.resume ? (
      <a
        href={`${BASE_URL}${application.media_uploads?.resume}`}
        download
        className="text-blue-600 underline"
      >
        View Resume
      </a>
    ) : (
      'No resume uploaded.'
    )}
  </p>
  <p>
    <strong>Cover Letter:</strong>{' '}
    {application.media_uploads?.cover_letter ? (
      <a
        href={`${BASE_URL}${application.media_uploads?.cover_letter}`}
        download
        className="text-blue-600 underline"
      >
        View Cover Letter
      </a>
    ) : (
      'No cover letter uploaded.'
    )}
  </p>
</div>
    </div>
  );
};

export default ApplicationDetail;

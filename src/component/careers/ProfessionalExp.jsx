import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddExperienceMutation } from "../../services/career/experienceApi";

const ProfessionalExperienceForm = () => {
  const navigate = useNavigate();
  const applicantId = useSelector((state) => state.personalInfo.applicantId); // Redux selector for applicant ID
  const [addExperience, { isLoading, isError, error }] = useAddExperienceMutation();

  // Validation schema
  const validationSchema = Yup.object({
    recentJobTitle: Yup.string().required("Reacent Job title is required"),
    recentCompany: Yup.string().required("Company name is required"),
    recentDuration: Yup.string().required("Duration is required"),
    recentResponsibilities: Yup.string().required("Responsibilities are required"),
    previousJobTitle: Yup.string().required("Previous Job title is required"),
    previousCompany: Yup.string().required("Previous Company name is required"),
    previousDuration: Yup.string().required("Previous Duration is required"),
    previousResponsibilities: Yup.string().required("Previous job Responsibilities are required"),
  });

  // Initial values
  const initialValues = {
    recentJobTitle: "",
    recentCompany: "",
    recentDuration: "",
    recentResponsibilities: "",
    previousJobTitle: "",
    previousCompany: "",
    previousDuration: "",
    previousResponsibilities: "",
  };

  // Submit handler
  const handleSubmit = async (values) => {
    const payload = [
      {
        job_application: applicantId,
        job_title: values.recentJobTitle,
        company: values.recentCompany,
        duration_from: values.recentDuration.split(' – ')[0],  // Extracting start date
        duration_to: values.recentDuration.split(' – ')[1],    // Extracting end date
        key_responsibilities: values.recentResponsibilities,
      },
      {
        job_application: applicantId,
        job_title: values.previousJobTitle,
        company: values.previousCompany,
        duration_from: values.previousDuration.split(' – ')[0],  // Extracting start date
        duration_to: values.previousDuration.split(' – ')[1],    // Extracting end date
        key_responsibilities: values.previousResponsibilities,
      }
    ];

    try {
      await addExperience(payload).unwrap();
      navigate("/skillassement"); // Navigate to the skill assessment page after successful submission
    } catch (err) {
      console.error("Error submitting experience:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Experience</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* Most Recent Job */}
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Most Recent Job Title:</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
                <Field
                  type="text"
                  name="recentJobTitle"
                  placeholder="Title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="recentJobTitle"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="recentCompany"
                  placeholder="Company"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="recentCompany"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="recentDuration"
                  placeholder="Duration (YYYY-MM-DD)"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="recentDuration"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="recentResponsibilities"
                  placeholder="Key Responsibilities"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="recentResponsibilities"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Previous Job */}
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Previous Job Title:</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
                <Field
                  type="text"
                  name="previousJobTitle"
                  placeholder="Title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="previousJobTitle"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="previousCompany"
                  placeholder="Company"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="previousCompany"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="previousDuration"
                  placeholder="Duration (YYYY-MM-DD)"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="previousDuration"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="previousResponsibilities"
                  placeholder="Key Responsibilities"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="previousResponsibilities"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Next'}
            </button>
            {isError && <div className="text-red-500 mt-2">Error: {error.message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfessionalExperienceForm;

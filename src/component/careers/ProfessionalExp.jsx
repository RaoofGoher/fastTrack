import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProfessionalExperienceForm = () => {
  // Validation schema
  const validationSchema = Yup.object({
    recentJobTitle: Yup.string().required("Most recent job title is required"),
    recentCompany: Yup.string().required("Company name is required"),
    recentDuration: Yup.string().required("Duration is required"),
    recentResponsibilities: Yup.string().required("Responsibilities are required"),
    previousJobTitle: Yup.string(),
    previousCompany: Yup.string(),
    previousDuration: Yup.string(),
    previousResponsibilities: Yup.string(),
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
  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
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
              {/* Company */}
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

              {/* Duration */}
              <div>
                <Field
                  type="text"
                  name="recentDuration"
                  placeholder="Duration (MM/YYYY – MM/YYYY)"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="recentDuration"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Responsibilities */}
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
              {/* Company */}
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

              {/* Duration */}
              <div>
                <Field
                  type="text"
                  name="previousDuration"
                  placeholder="Duration (MM/YYYY – MM/YYYY)"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="previousDuration"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Responsibilities */}
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
            >
              Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfessionalExperienceForm;

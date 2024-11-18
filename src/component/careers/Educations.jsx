import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSubmitEducationMutation } from "../../services/career/educationApi"; // Update path as needed

const Education = () => {
  const navigate = useNavigate();
  const applicantId = useSelector((state) => state.personalInfo.applicantId);
  const [submitEducation, { isLoading }] = useSubmitEducationMutation();

  // Validation schema
  const validationSchema = Yup.object({
    degree: Yup.string().required("Degree is required"),
    institution: Yup.string().required("Institution is required"),
    graduationDate: Yup.date()
      .required("Graduation date is required")
      .typeError("Invalid date format"),
  });

  // Initial values
  const initialValues = {
    degree: "",
    institution: "",
    graduationDate: "",
  };

  // Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Map values to API payload format
      const payload = [{
        job_application: applicantId, // Update this with the appropriate value
        degree: values.degree,
        institute: values.institution,
        graduation_year: new Date(values.graduationDate).getFullYear(),
      }]

      // Make the API call
      await submitEducation(payload).unwrap();

      // Navigate to next page on success
      navigate("/additionalinfo");
    } catch (error) {
      console.error("Failed to submit education data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Degree */}
            <div className="mb-6">
              <label
                htmlFor="degree"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Degree
              </label>
              <Field
                type="text"
                id="degree"
                name="degree"
                placeholder="Enter your degree"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="degree"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Institution */}
            <div className="mb-6">
              <label
                htmlFor="institution"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Institution
              </label>
              <Field
                type="text"
                id="institution"
                name="institution"
                placeholder="Enter the institution name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="institution"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Graduation Date */}
            <div className="mb-6">
              <label
                htmlFor="graduationDate"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Graduation Date
              </label>
              <Field
                type="date"
                id="graduationDate"
                name="graduationDate"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="graduationDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`px-6 py-2 text-white rounded-md focus:outline-none ${
                isSubmitting || isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting || isLoading ? "Submitting..." : "Next"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Education;

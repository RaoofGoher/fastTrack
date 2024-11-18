import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useSubmitPositionInformationMutation } from '../../services/career/positionInfoApi';
const PositionInformationForm = () => {
  const [employmentType, setEmploymentType] = useState(""); // State to track employment type
  const navigate = useNavigate();

  const applicantId = useSelector((state) => state.personalInfo.applicantId);
  console.log("here is applicant id",applicantId)

  const [submitPositionInformation] = useSubmitPositionInformationMutation();
  // Validation schema
  const validationSchema = Yup.object({
    position_applied_for: Yup.string().required("Position is required"),
    employment_type: Yup.string()
      .required("Employment type is required")
      .oneOf(["Full Time", "Part Time"], "Select a valid employment type"),
      preferred_shift: Yup.string()
      .nullable()
      .test("shift-required", "Shift is required", function (value) {
        const { employment_type } = this.parent;
        if (employment_type === "Full Time" || employment_type === "Part Time") {
          return !!value; // Check if value is provided
        }
        return true; // No validation if employment_type is not Full-Time/Part-Time
      }),
      applied_date: Yup.date().required("Date is required").nullable(),
  });
  
  
  
  // Initial values
  const initialValues = {
    position_applied_for: "",
    employment_type: "",
    preferred_shift: "",
    applied_date: "",
  };

  // Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = { ...values, job_application: applicantId }; // Add applicantId to payload
      await submitPositionInformation(payload).unwrap();
      console.log('Form submitted successfully:', payload);
      navigate('/professionalexp');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };


  // Handle employment type change
  const handleEmploymentTypeChange = (event, setFieldValue) => {
    const value = event.target.value;
    setEmploymentType(value);
    setFieldValue("employment_type", value);
    setFieldValue("preferred_shift", ""); // Reset shift field when employment type changes
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Position Information:</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            {/* Position Applied For */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="position_applied_for">
                Position Applied For <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="position_applied_for"
                name="position_applied_for"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Position</option>
                <option value="Customer Service Representative">
                  Customer Service Representative
                </option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="Technical Support">Technical Support</option>
              </Field>
              <ErrorMessage
                name="position_applied_for"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Employment Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="employment_type">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="employment_type"
                name="employment_type"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleEmploymentTypeChange(e, setFieldValue)}
              >
                <option value="">Select Employment Type</option>
                <option value="Full Time">Full-Time</option>
                <option value="Part Time">Part-Time</option>
              </Field>
              <ErrorMessage
                name="employment_type"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Dynamic Shift Dropdown */}
            {employmentType === "Full Time" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="preferred_shift">
                  For Full-Time Applicants <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  id="preferred_shift"
                  name="preferred_shift"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Shift</option>
                  <option value="Night">Night Shift</option>
                  <option value="Day">Day Shift</option>
                </Field>
                <ErrorMessage
                  name="preferred_shift"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}

            {employmentType === "Part Time" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="preferred_shift">
                  For Part-Time Applicants <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  id="preferred_shift"
                  name="preferred_shift"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Shift</option>
                  <option value="6am - 12pm">6:00 AM - 12:00 Noon</option>
                  <option value="12pm - 6pm">12:00 Noon - 6:00 PM</option>
                  <option value="6pm - 12am">6:00 PM - Midnight</option>
                  
                </Field>
                <ErrorMessage
                  name="preferred_shift"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}

            {/* Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="applied_date">
                Date <span className="text-red-500">*</span>
              </label>
              <Field
                type="date"
                id="applied_date"
                name="applied_date"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="applied_date"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
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

export default PositionInformationForm;

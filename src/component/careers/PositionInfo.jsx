import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const PositionInformationForm = () => {
  
  const navigate = useNavigate()
  // Validation schema

  const validationSchema = Yup.object({
    position: Yup.string().required("Position is required"),
    employmentType: Yup.string().required("Employment type is required"),
    fullTimeShift: Yup.string().required("Full-time shift is required"),
    partTimeShift: Yup.string().required("Part-time shift is required"),
    date: Yup.date().required("Date is required").nullable(),
  });

  // Initial values
  const initialValues = {
    position: "",
    employmentType: "",
    fullTimeShift: "",
    partTimeShift: "",
    date: "",
  };

  // Submit handler
  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    navigate("/professionalexp");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Position Information:</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* Position Applied For */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="position">
                Position Applied For <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="position"
                name="position"
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
                name="position"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Employment Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="employmentType">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="employmentType"
                name="employmentType"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Employment Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
              </Field>
              <ErrorMessage
                name="employmentType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Section Divider */}
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Section Divider</h3>

            {/* Preferred Shift */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Full-Time Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="fullTimeShift">
                  For Full-Time Applicants <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  id="fullTimeShift"
                  name="fullTimeShift"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Shift</option>
                  <option value="Rotational Shift">Rotational Shift</option>
                  <option value="Night Shift">Night Shift</option>
                  <option value="Day Shift">Day Shift</option>
                </Field>
                <ErrorMessage
                  name="fullTimeShift"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Part-Time Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="partTimeShift">
                  For Part-Time Applicants <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  id="partTimeShift"
                  name="partTimeShift"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Shift</option>
                  <option value="6:00 AM - 12:00 Noon">6:00 AM - 12:00 Noon</option>
                  <option value="12:00 Noon - 6:00 PM">12:00 Noon - 6:00 PM</option>
                  <option value="6:00 PM - Midnight">6:00 PM - Midnight</option>
                  <option value="Midnight - 6:00 AM">Midnight - 6:00 AM</option>
                </Field>
                <ErrorMessage
                  name="partTimeShift"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="date">
                Date <span className="text-red-500">*</span>
              </label>
              <Field
                type="date"
                id="date"
                name="date"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="date"
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

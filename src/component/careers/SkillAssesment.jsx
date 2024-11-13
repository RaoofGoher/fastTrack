import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SkillsAssessment = () => {
  // Validation schema
  const validationSchema = Yup.object({
    languages: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one language")
      .required("This field is required"),
    challengeDescription: Yup.string()
      .required("Please describe a challenging customer service situation"),
  });

  // Initial values
  const initialValues = {
    languages: [],
    challengeDescription: "",
  };

  // Submit handler
  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills Assessment</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* Languages Spoken */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Languages Spoken (Select all that apply): *
              </label>
              <div className="flex gap-4 flex-wrap">
                {/* English */}
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="English"
                    className="accent-blue-500"
                  />
                  English
                </label>

                {/* Spanish */}
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="Spanish"
                    className="accent-blue-500"
                  />
                  Spanish
                </label>

                {/* French */}
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="French"
                    className="accent-blue-500"
                  />
                  French
                </label>

                {/* Creole */}
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="Creole"
                    className="accent-blue-500"
                  />
                  Creole
                </label>

                {/* Other */}
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="Other"
                    className="accent-blue-500"
                  />
                  Other
                </label>
              </div>
              <ErrorMessage
                name="languages"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Customer Service Challenge */}
            <div className="mb-6">
              <label
                htmlFor="challengeDescription"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Describe a challenging customer service situation and how you resolved it
              </label>
              <Field
                as="textarea"
                id="challengeDescription"
                name="challengeDescription"
                rows="5"
                placeholder="Enter your response here"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="challengeDescription"
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

export default SkillsAssessment;

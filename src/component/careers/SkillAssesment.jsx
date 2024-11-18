import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSubmitSkillsAssessmentMutation } from "../../services/career/skillAssessmentApi";
import { useDispatch, useSelector } from "react-redux";

const SkillsAssessment = () => {
  const navigate = useNavigate();
  const applicantId = useSelector((state) => state.personalInfo.applicantId);
  const [submitSkillsAssessment, { isLoading, isSuccess, isError, error }] =
    useSubmitSkillsAssessmentMutation();

  // Validation schema
  const validationSchema = Yup.object({
    languages: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one language")
      .required("This field is required"),
    challengeDescription: Yup.string()
      .required("Please describe a challenging customer service situation"),
    troubleshootingExperience: Yup.string()
      .required("Please describe your experience with troubleshooting software or hardware issues"),
    technicalCertifications: Yup.string()
      .required("Please list any technical certifications"),
  });

  // Initial values
  const initialValues = {
    languages: [],
    challengeDescription: "",
    troubleshootingExperience: "",
    technicalCertifications: "",
  };

  // Submit handler
  const handleSubmit = async (values) => {
    const payload = {
      job_application: applicantId, // Adjust this field based on your application flow
      languages: values.languages.join(","),
      tech_skills:values.tech_skills,
      certificates: values.technicalCertifications,
      tech_experience_description: `${values.challengeDescription}\n${values.troubleshootingExperience}`,
    };

    try {
      await submitSkillsAssessment(payload).unwrap();
      navigate("/education"); // Redirect on success
    } catch (err) {
      console.error("Submission failed: ", err);
    }
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
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="English"
                    className="accent-blue-500"
                  />
                  English
                </label>
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="Spanish"
                    className="accent-blue-500"
                  />
                  Spanish
                </label>
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="French"
                    className="accent-blue-500"
                  />
                  French
                </label>
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="Creole"
                    className="accent-blue-500"
                  />
                  Creole
                </label>
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tech Skills</h3>
            <div>
                <Field
                  type="text"
                  name="tech_skills"
                  placeholder="Title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="tech_skills"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            {/* Troubleshooting Experience */}
            <div className="mb-6">
              <label
                htmlFor="troubleshootingExperience"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Describe your experience with troubleshooting software or hardware issues
              </label>
              <Field
                as="textarea"
                id="troubleshootingExperience"
                name="troubleshootingExperience"
                rows="5"
                placeholder="Enter your response here"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="troubleshootingExperience"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Technical Certifications */}
            <div className="mb-6">
              <label
                htmlFor="technicalCertifications"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                List any technical certifications
              </label>
              <Field
                as="textarea"
                id="technicalCertifications"
                name="technicalCertifications"
                rows="5"
                placeholder="Enter your response here"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="technicalCertifications"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Next"}
            </button>
            {isSuccess && <p className="text-green-500 mt-2">Submission successful!</p>}
            {isError && <p className="text-red-500 mt-2">{error?.data?.message || "Submission failed"}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SkillsAssessment;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate,Link } from "react-router-dom";
import { useSubmitSkillsAssessmentMutation, useUpdateSkillsMutation } from "../../services/career/skillAssessmentApi";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from '../../services/career/formDataSlice';

const SkillsAssessment = () => {
  const positionAppliedFor = useSelector((state) => state.positionApplied.positionAppliedFor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applicantId = useSelector((state) => state.personalInfo.applicantId);
  const [submitSkillsAssessment, { isLoading, isSuccess, isError, error }] = useSubmitSkillsAssessmentMutation();
  const [updateSkillsAssessment,] = useUpdateSkillsMutation();
  const { skillAssement } = useSelector((state) => state.formData);

  const roleBasedQuestions = {
    "Customer Service Representative": [
      "Describe a challenging customer service situation and how you resolved it?",
      "How do you handle difficult customers?",
      "What strategies do you use to ensure customer satisfaction?",
      "Can you provide an example of a time you went above and beyond for a customer?"
    ],
    "Sales Representative": [
      "Describe your experience with meeting sales targets.",
      "What techniques do you use to build and maintain client relationships?",
      "How do you handle objections during a sales pitch?",
      "Share an example of a successful sales strategy you implemented."
    ],
    "Technical Support": [
      "Describe your experience with troubleshooting software or hardware issues.",
      "Write your technical skills.",
      "List any technical certifications.",
      "How do you stay updated on the latest technology trends?"
    ]
  };



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
    languages: skillAssement?.languages ? skillAssement.languages.split(",") : [],
    challengeDescription: skillAssement?.tech_experience_description?.split("\n")[0] || "",
    troubleshootingExperience: skillAssement?.tech_experience_description?.split("\n")[1] || "",
    technicalCertifications: skillAssement?.certificates || "",
  };

  // Submit handler
  const handleSubmit = async (values) => {

    const formattedData = {
      languages: values.languages.join(","), // Convert array to a comma-separated string
      tech_skills: values.tech_skills, // Include technical skills
      certificates: values.technicalCertifications, // Include certifications
      tech_experience_description: `${values.challengeDescription}\n${values.troubleshootingExperience}`, // Combine descriptions
    };


    const payload = {
      job_application: applicantId, // Adjust this field based on your application flow
      languages: values.languages.join(","),
      tech_skills: values.tech_skills,
      certificates: values.technicalCertifications,
      tech_experience_description: `${values.challengeDescription}\n${values.troubleshootingExperience}`,
    };

try {
  if(skillAssement && skillAssement?.languages){
    const response = await updateSkillsAssessment({
      applicantId,
      data: formattedData,
    }).unwrap();
    navigate("/education");
    console.log("Updated successfully:", response);
  }else {
     
    const response = await submitSkillsAssessment(payload).unwrap();
      console.log("skill assement response", response,payload)
      navigate("/education"); // Redirect on succes
      dispatch(setFormData({ componentName: 'skillAssement', data: payload }));

  }
}catch (err) {
    console.error("Submission failed: ", err);
  }

  };
console.log("skillAssement store", skillAssement)
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
                {/* <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="languages"
                    value="Other"
                    className="accent-blue-500"
                  />
                  Other
                </label> */}
              </div>
              <ErrorMessage
                name="languages"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {/* questions */}
            {/* Customer Service Challenge */}
            <div className="mb-6">
              <label
                htmlFor="challengeDescription"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                {positionAppliedFor === "Customer Service Representative" && "Describe a challenging customer service situation and how you resolved it?"}
                {positionAppliedFor === "Sales Representative" && "Describe your experience with meeting sales targets."}
                {positionAppliedFor === "Technical Support" && "Describe your experience with troubleshooting software or hardware issues."}
              
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {positionAppliedFor === "Customer Service Representative" && "How do you handle difficult customers?"}
              {positionAppliedFor === "Sales Representative" && "What techniques do you use to build and maintain client relationships?"}
              {positionAppliedFor === "Technical Support" && "Write your technical skills."}
              </h3>
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
               {positionAppliedFor === "Customer Service Representative" && "What strategies do you use to ensure customer satisfaction?"}
               {positionAppliedFor === "Sales Representative" && "How do you handle objections during a sales pitch?"}
               {positionAppliedFor === "Technical Support" && "List any technical certifications."}
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
                {positionAppliedFor === "Customer Service Representative" && "Can you provide an example of a time you went above and beyond for a customer?"}
                {positionAppliedFor === "Sales Representative" && "Share an example of a successful sales strategy you implemented."}
                {positionAppliedFor === "Technical Support" && "How do you stay updated on the latest technology trends?"}
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
            <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
             {skillAssement && skillAssement?.languages ? "Update":"Next"}
            </button>
            <Link to={"/professionalexp"} className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-500 focus:outline-none">Back</Link>
            </div>
             </Form>
        )}
      </Formik>
    </div>
  );
};

export default SkillsAssessment;

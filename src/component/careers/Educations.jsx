import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSubmitEducationMutation, useUpdateEducationMutation } from "../../services/career/educationApi"; // Update path as needed
import { setFormData } from '../../services/career/formDataSlice';
const Education = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicantId = useSelector((state) => state.personalInfo.applicantId);
  const [submitEducation, { isLoading }] = useSubmitEducationMutation();
  const [updateEducation,] = useUpdateEducationMutation();
  const { education } = useSelector((state) => state.formData);
  console.log ("education", education)
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
    degree: education && education?.degree ? education.degree : "",
    institution: education && education?.institute ? education.institute : "",
    graduationDate: education && education?.graduation_year
      ? `${education.graduation_year}-01-01` // Convert year to date string
      : "",
  };

  // Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {

    try {
      if (education && education.degree) {
        const mappedPayload = {  
          degree: values.degree,
          institute: values.institution, // Renamed field
          graduation_year: new Date(values.graduationDate).getFullYear(), // Extract the year
        };
        const response = await updateEducation({
          applicantId:applicantId,
          data: mappedPayload,
        }).unwrap();
        console.log("Updated successfully:", response);
      } else {
        
        const mappedPayload = {
          job_application: applicantId,
          degree: values.degree,
          institute: values.institution, // Renamed field
          graduation_year: new Date(values.graduationDate).getFullYear(), // Extract the year
        };
        // Add applicantId to payload
        const response = await submitEducation(mappedPayload).unwrap();
        console.log("submit successfully:", response, mappedPayload); 
        
        dispatch(setFormData({ componentName: 'education', data: mappedPayload }));
      }
             
      navigate("/additionalInfo"); // Redirect to the next page
    } catch (error) {
      console.error("Error submitting personal info:", error);
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
        {({values, isSubmitting }) => (
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
            <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
             {education && education.degree ? "Update":"Next"}
            </button>
            <Link to={"/skillassement"} className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-500 focus:outline-none">Back</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Education;

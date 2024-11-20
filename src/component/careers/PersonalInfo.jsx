import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setApplicantId } from "../../services/career/PersonalInfo"; // Import the action
import { useSubmitPersonalInfoMutation } from "../../services/career/PersonalInfoApi"; // Import the mutation hook


const PersonalInformationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitPersonalInfo] = useSubmitPersonalInfoMutation();
  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    // phone: Yup.string().required("Phone number is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("state is required"),
    zip: Yup.string().matches(/^\d{5}$/, "ZIP must be 5 digits").required("zip is required"),
    linkedin: Yup.string().url("Invalid URL"),
  });

  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    linkedin: "",
  };

  // Form submit handler
  const handleSubmit = async (values) => {
    // Combine address into a single string
    const address = `${values.street}, ${values.city}, ${values.state} ${values.zip}`;

    try {
      const response = await submitPersonalInfo({
        ...values,
        address, // Include the combined address in the request body
      }).unwrap(); // unwrap to access the result or catch errors

      // Store the applicantId in the Redux store
      dispatch(setApplicantId(response.applicant_id));
      console.log("hello",response.applicant_id)
      navigate("/positioninfo"); // Redirect to the next page
    } catch (error) {
      console.error("Error submitting personal info:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information:</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                Phone Number 
              </label>
              <div className="phone-input-container">
              <PhoneInput
                country={"pk"}
                inputClass="!w-full px-4 !py-2 !rounded-md !border !mt-1 "
                onChange={(value) => setFieldValue("phone", value)}
              />
               </div>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Address Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                <Field
                  type="text"
                  name="street"
                  placeholder="Street"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                   <ErrorMessage
                name="street"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              </div>
              <div>
                <Field
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                   <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              </div>
              <div>
                <Field
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                   <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              </div>
              <div>
                <Field
                  type="text"
                  name="zip"
                  placeholder="ZIP"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              
              <ErrorMessage
                name="zip"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              </div>
            </div>
            </div>

            {/* LinkedIn Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="linkedin">
                LinkedIn Profile (optional)
              </label>
              <Field
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="LinkedIn URL"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="linkedin"
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

export default PersonalInformationForm;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddExperienceMutation, useUpdateExperienceMutation } from "../../services/career/experienceApi";
import { setFormData } from '../../services/career/formDataSlice';

const ProfessionalExperienceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applicantId = useSelector((state) => state.personalInfo.applicantId);
  const [addExperience] = useAddExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const { professionalExp } = useSelector((state) => state.formData);
  const [addExperienceBtn, setAddExperienceBtn] = useState(professionalExp.length > 0 && professionalExp[0]?.job_title ? true : false);


  // Validation schema
  const validationSchema = Yup.object({
    // recentJobTitle: Yup.string().required("Recent Job title is required").nullable(),
    // recentCompany: Yup.string().required("Company name is required").nullable(),
    // recentStartDate: Yup.date().required("Start date is required").nullable(),
    // recentEndDate: Yup.date().required("End date is required").nullable()
    //   .min(Yup.ref('recentStartDate'), "End date must be after start date"),
    // recentResponsibilities: Yup.string().required("Responsibilities are required").nullable(),
    // previousJobTitle: Yup.string().required("Previous Job title is required").nullable(),
    // previousCompany: Yup.string().required("Previous Company name is required").nullable(),
    // previousStartDate: Yup.date().required("Start date is required").nullable(),
    // previousEndDate: Yup.date().required("End date is required").nullable()
    //   .min(Yup.ref('previousStartDate'), "End date must be after start date"),
    // previousResponsibilities: Yup.string().required("Previous job Responsibilities are required").nullable(),
  });


  console.log("hello professional exp on come back", professionalExp)

  // Initial values
  // initialValues={
  //   professionalExp.length > 0
  //     ? {
  //         recentJobTitle: professionalExp[0]?.job_title || "",
  //         recentCompany: professionalExp[0]?.company || "",
  //         recentStartDate: professionalExp[0]?.duration_from || "",
  //         recentEndDate: professionalExp[0]?.duration_to || "",
  //         recentResponsibilities: professionalExp[0]?.key_responsibilities || "",
  //         previousJobTitle: professionalExp[1]?.job_title || "",
  //         previousCompany: professionalExp[1]?.company || "",
  //         previousStartDate: professionalExp[1]?.duration_from || "",
  //         previousEndDate: professionalExp[1]?.duration_to || "",
  //         previousResponsibilities: professionalExp[1]?.key_responsibilities || "",
  //       }
  //     : {
  //         recentJobTitle: "",
  //         recentCompany: "",
  //         recentStartDate: "",
  //         recentEndDate: "",
  //         recentResponsibilities: "",
  //         previousJobTitle: "",
  //         previousCompany: "",
  //         previousStartDate: "",
  //         previousEndDate: "",
  //         previousResponsibilities: "",
  //       }
  // }

  // Submit handler
  const handleSubmit = async (values) => {
    const payload = [
      {
        job_application: applicantId,
        job_title: values.recentJobTitle,
        company: values.recentCompany,
        duration_from: values.recentStartDate,
        duration_to: values.recentEndDate,
        key_responsibilities: values.recentResponsibilities,
      },
      {
        job_application: applicantId,
        job_title: values.previousJobTitle,
        company: values.previousCompany,
        duration_from: values.previousStartDate,
        duration_to: values.previousEndDate,
        key_responsibilities: values.previousResponsibilities,
      },
    ];

    try {
      console.log("hello professional info", professionalExp, professionalExp[0]?.job_title)
      if (professionalExp && professionalExp[0]?.job_title) {
        const response = await updateExperience({
          applicantId: applicantId,
          data: values,
        }).unwrap();
        console.log("Updated successfully:", response);
      } else {
        await addExperience(payload).unwrap();
        console.log("Added successfully", payload);
        dispatch(setFormData({ componentName: 'professionalExp', data: payload }));
        navigate("/skillassement");
      }

    } catch (err) {
      console.error("Error submitting experience:", err);
    }
  };
  const experienceHandler = () => {
    setAddExperienceBtn((prevState) => !prevState);
  };
  const handleSubmit2 = () => {
    navigate("/skillassement");

  }
  const handleSkip = (resetForm) => {
    resetForm();
    navigate("/skillassement");
    dispatch(setFormData({ componentName: 'professionalExp', data: "" }));
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex flex-row justify-between items-center mb-4">
        {professionalExp.length > 0  ? "" : (
          <button
            onClick={experienceHandler}
            className="bg-gray-700 px-4 py-2 rounded-lg text-white border-2 border-gray-700 hover:bg-white hover:text-gray-700"
          >
            {addExperienceBtn === false ? "click to add experience if any" : "close experience"}
          </button>
        )}
        {addExperienceBtn === false ? <button onClick={handleSubmit2} className="bg-blue-500 px-4 py-2 rounded-lg text-white border-2 border-blue-500 hover:bg-white hover:text-blue-500">Skip</button> : ""}
      </div>

      {addExperienceBtn && <>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Experience</h2>
        <Formik
          initialValues={
            professionalExp.length > 0
              ? {
                recentJobTitle: professionalExp[0]?.job_title || "",
                recentCompany: professionalExp[0]?.company || "",
                recentStartDate: professionalExp[0]?.duration_from || "",
                recentEndDate: professionalExp[0]?.duration_to || "",
                recentResponsibilities: professionalExp[0]?.key_responsibilities || "",
                previousJobTitle: professionalExp[1]?.job_title || "",
                previousCompany: professionalExp[1]?.company || "",
                previousStartDate: professionalExp[1]?.duration_from || "",
                previousEndDate: professionalExp[1]?.duration_to || "",
                previousResponsibilities: professionalExp[1]?.key_responsibilities || "",
              }
              : {
                recentJobTitle: "",
                recentCompany: "",
                recentStartDate: "",
                recentEndDate: "",
                recentResponsibilities: "",
                previousJobTitle: "",
                previousCompany: "",
                previousStartDate: "",
                previousEndDate: "",
                previousResponsibilities: "",
              }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ resetForm }) => (
            <Form>
              {professionalExp.length > 0 ? <button type="button" onClick={() => handleSkip(resetForm)} className="bg-blue-500 px-4 py-2 rounded-lg text-white border-2 border-blue-500 hover:bg-white hover:text-blue-500">Skip</button> : ""}
              {/* Most Recent Job */}
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Most Recent Job:</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
                  <h5 className="font-semibold text-gray-700 mb-2">Start</h5>
                  <Field
                    type="date"
                    name="recentStartDate"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="recentStartDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">End</h5>
                  <Field
                    type="date"
                    name="recentEndDate"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="recentEndDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="col-span-2">
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
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Previous Job:</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
                  <h5 className="font-semibold text-gray-700 mb-2">Start</h5>
                  <Field
                    type="date"
                    name="previousStartDate"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="previousStartDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">End</h5>
                  <Field
                    type="date"
                    name="previousEndDate"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="previousEndDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="col-span-2">
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
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"

                >
                  {professionalExp && professionalExp[0]?.job_title ? "Update" : "Next"}
                </button>
                <Link to={"/jobs"} className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-500 focus:outline-none">Back</Link>
              </div>


            </Form>
          )}
        </Formik>
      </>}

    </div>
  );
};

export default ProfessionalExperienceForm;

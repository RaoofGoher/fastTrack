import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const Attachments = () => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
 const navigate = useNavigate();
  const validationSchema = Yup.object({
    resume: Yup.mixed()
      .required('Resume is required')
      .test('fileType', 'Only PDF files are allowed', (value) =>
        value && value.type === 'application/pdf'
      ),
    // coverLetter: Yup.mixed().test('fileType', 'Only PDF files are allowed', (value) =>
    //   !value || value.type === 'application/pdf'
    // ),
  });

  const handleFileChange = (e, setFieldValue, field) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (field === 'resume') {
        setResume(uploadedFile);
      } else if (field === 'coverLetter') {
        setCoverLetter(uploadedFile);
      }
      setFieldValue(field, uploadedFile);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Formik
        initialValues={{
          resume: null,
          coverLetter: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log('Form values:', values);
          navigate('/confirmation'); // Redirect to next step
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="space-y-4">
            {/* Resume Upload */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Upload Your Resume *
              </label>
              <div
                className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
                onClick={() =>
                  document.querySelector('input[name="resume"]').click()
                }
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) {
                    setResume(droppedFile);
                    setFieldValue('resume', droppedFile);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="flex flex-col items-center">
                  <AiOutlineCloudUpload className="text-4xl text-gray-500" />
                  <p className="mt-2 text-gray-500">
                    Click or drag a file to this area to upload.
                  </p>
                </div>
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setFieldValue, 'resume')}
                />
                {resume && (
                  <div className="mt-2 text-sm text-gray-500">{resume.name}</div>
                )}
              </div>
              {errors.resume && touched.resume && (
                <div className="text-red-500 text-sm mt-1">{errors.resume}</div>
              )}
            </div>

            {/* Cover Letter Upload */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Upload Cover Letter (Optional)
              </label>
              <div
                className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
                onClick={() =>
                  document.querySelector('input[name="coverLetter"]').click()
                }
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) {
                    setCoverLetter(droppedFile);
                    setFieldValue('coverLetter', droppedFile);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="flex flex-col items-center">
                  <AiOutlineCloudUpload className="text-4xl text-gray-500" />
                  <p className="mt-2 text-gray-500">
                    Click or drag a file to this area to upload.
                  </p>
                </div>
                <input
                  type="file"
                  name="coverLetter"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e, setFieldValue, 'coverLetter')
                  }
                />
                {coverLetter && (
                  <div className="mt-2 text-sm text-gray-500">
                    {coverLetter.name}
                  </div>
                )}
              </div>
              {errors.coverLetter && touched.coverLetter && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.coverLetter}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Attachments;

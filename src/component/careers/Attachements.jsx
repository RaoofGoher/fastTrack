import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadMediaMutation } from '../../services/career/mediaApi'; // Adjust this import based on your file structure
import { useVideoContext } from '../../context/VideoContext';
const Attachments = () => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addMedia, { isLoading, isError, error }] = useUploadMediaMutation();
  
  const {
    video
  } = useVideoContext();
  // Assuming applicantId and video are in the store (e.g., in the user slice)
  const applicantId = useSelector((state) => state.personalInfo.applicantId);
  

  const validationSchema = Yup.object({
    resume: Yup.mixed()
      .required('Resume is required')
      .test('fileType', 'Only PDF files are allowed', (value) =>
        value && value.type === 'application/pdf'
      ),
    coverLetter: Yup.mixed()
      .required('Cover Letter is required')
      .test('fileType', 'Only PDF files are allowed', (value) =>
        value && value.type === 'application/pdf'
      ),
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

  const handleSubmit = async (values) => {
    // Create form data to send with the POST request
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);
    formData.append('job_application', applicantId); // Adding applicantId to the payload
    formData.append('video', video); // Adding video from store to the payload

    // Dispatch the uploadMedia action with formData
    try {
      await addMedia(formData).unwrap(); // Assume this is your RTK Query mutation
      console.log('Upload Response:', response);
      navigate('/confirmation');
    } catch (error) {
      console.error('Error uploading files:', error);
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
        onSubmit={handleSubmit}
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

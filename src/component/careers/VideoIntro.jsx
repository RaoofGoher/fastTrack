import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useVideoContext } from '../../context/VideoContext.jsx'; // Import useVideoContext

const VideoIntro = () => {
  const { video, setVideo } = useVideoContext(); // Access context for video state
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    video: Yup.mixed()
      .required('Please upload a video')
      .test('fileType', 'Only video files are allowed', (value) =>
        value && value.type.startsWith('video/')
      )
      .test('fileSize', 'File size must be less than 5 MB', (value) =>
        value && value.size <= 5 * 1024 * 1024 // 5 MB limit
      ),
    message: Yup.string(),
  });

  const handleFileChange = (e, setFieldValue) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5 MB.');
        return;
      }
      setFile(uploadedFile); // Update local state with selected file
      setVideo(uploadedFile); // Store video in context
      setFieldValue('video', uploadedFile); // Update Formik value
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('video', video); // Add video file from context
    formData.append('message', values.message); // Add message field

    // Assuming your API expects the data as 'multipart/form-data'
    try {
      // Call your API for submission here
      console.log('Form Data:', formData);
      navigate("/attachements");
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Formik
        initialValues={{
          video: null,
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // Use handleSubmit function
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Upload a Short Video (30 seconds)
              </label>
              <div
                className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()} // Trigger input click
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) {
                    if (droppedFile.size > 5 * 1024 * 1024) {
                      alert('File size must be less than 5 MB.');
                      return;
                    }
                    setFile(droppedFile);
                    setVideo(droppedFile); // Store in context
                    setFieldValue('video', droppedFile);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="flex flex-col items-center">
                  <AiOutlineCloudUpload className="text-4xl text-gray-500" />
                  <p className="mt-2 text-gray-500">
                    Click or drag a file to this area to upload. Maximum upload size is 5mb
                  </p>
                </div>
                <input
                  id="fileInput" // Added an ID to target the input
                  type="file"
                  name="video"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setFieldValue)} // Update context and Formik on file change
                />
                {file && (
                  <div className="mt-2 text-sm text-gray-500">{file.name}</div>
                )}
              </div>
              {errors.video && touched.video && (
                <div className="text-red-500 text-sm mt-1">{errors.video}</div>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Introduce yourself and tell us why you're excited about this role. (This is optional)
              </label>
              <Field
                as="textarea"
                name="message"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

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

export default VideoIntro;

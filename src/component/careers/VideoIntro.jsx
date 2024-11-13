import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const VideoIntro = () => {
  const [file, setFile] = useState(null);

  const validationSchema = Yup.object({
    video: Yup.mixed()
      .required('Please upload a video')
      .test('fileType', 'Only video files are allowed', (value) =>
        value && value.type.startsWith('video/')
      ),
    message: Yup.string(),
  });

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
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
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Upload a Short Video (30 seconds)
              </label>
              <div
                className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center"
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) {
                    setFile(droppedFile);
                    setFieldValue('video', droppedFile);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="flex flex-col items-center">
                  <AiOutlineCloudUpload className="text-4xl text-gray-500" />
                  <p className="mt-2 text-gray-500">Click or drag a file to this area to upload.</p>
                </div>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    handleFileChange(e);
                    setFieldValue('video', e.target.files[0]);
                  }}
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

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploadFile } from './api'; // Import your upload API function

const DriveForm = () => {
  const [uploadedFile, setUploadedFile] = useState(null); // Store the selected file

  // Formik initialization with validation schema
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      expiryDate: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      expiryDate: Yup.date().required('Expiry date is required').nullable(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('file', uploadedFile); // Add the file to FormData
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('expiryDate', values.expiryDate);

      // Get the token from local storage (or another method)
      const accessToken = localStorage.getItem('access_token'); // or use your context/store

      if (!accessToken) {
        console.error('No access token found!');
        return;
      }

      try {
        // Send the token in the headers along with the form data
        const response = await uploadFile(formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include token in the request headers
          },
        }).unwrap(); // Send the FormData with the token

        console.log('File uploaded successfully:', response);
        // Optionally, handle success response, e.g., showing a success message
      } catch (error) {
        console.error('File upload failed:', error);
        // Optionally, handle error, e.g., showing an error message
      }
    },
  });

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file); // Store the uploaded file in state
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Document</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-600 text-sm">{formik.errors.title}</div>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-600 text-sm">{formik.errors.description}</div>
          )}
        </div>

        {/* Expiry Date Field */}
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.expiryDate && formik.errors.expiryDate && (
            <div className="text-red-600 text-sm">{formik.errors.expiryDate}</div>
          )}
        </div>

        {/* File Upload Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Choose File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {!uploadedFile && (
            <div className="text-red-600 text-sm">Please upload a file.</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={!uploadedFile || formik.isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
          >
            {formik.isSubmitting ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriveForm;

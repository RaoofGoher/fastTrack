import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const DriveForm = () => {
  const location = useLocation();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
   
  
  const { token } = location.state || {};

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      documentId: '', // You can get this value if needed
      expiryDate: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      expiryDate: Yup.date().required('Expiry date is required').nullable(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", uploadedFile); // Append the file to FormData
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("expiryDate", values.expiryDate);

      // Get the access token from local storage (or other global state)
      const accessToken = token; // Adjust based on your app's state management

      if (!accessToken) {
        console.error("No access token found!");
        return;
      }

      try {
        // Sending the request with the access token in the header
        const response = await axios.post('https://api.fastrakconnect.com/upload/', formData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Send token in Authorization header
            'Content-Type': 'multipart/form-data', // Specify that the request contains a file
          },
        });

        // Handle successful upload response
        if (response.status === 201) {
          console.log('File uploaded successfully:', response.data);
          // Optionally, handle any post-upload actions (like showing a success message)
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        // You can handle the error here, display a message, etc.
        setFileError(error.response ? error.response.data.error : 'Upload failed');
      }
    },
  });

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setFileError('File size exceeds 5MB');
        setUploadedFile(null);
      } else {
        setUploadedFile(file);
        setFileError(null); // Reset error if file is valid
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expiryDate}
          />
          {formik.touched.expiryDate && formik.errors.expiryDate ? (
            <div className="text-red-500 text-sm">{formik.errors.expiryDate}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File</label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*,application/pdf,application/msword,application/vnd.ms-excel"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {fileError && <div className="text-red-500 text-sm">{fileError}</div>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={!formik.isValid || !uploadedFile}
        >
          Upload Document
        </button>
      </form>
    </div>
  );
};

export default DriveForm;

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
 console.log("hello from drive token",token)
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      documentId: '', // You can get this value if needed
      expiry_date: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      expiry_date: Yup.date().required('Expiry date is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
    
      // Debugging uploaded file
      console.log("Uploaded File: ", uploadedFile);
      if (uploadedFile) {
        formData.append("file", uploadedFile); // Append the file to FormData
      } else {
        console.error("No file selected!");
      }
    
      console.log("Formik Values: ", values);
      formData.append("title", values.title);
      formData.append("description", values.description);
    
      // Format expiryDate to yyyy-mm-dd
      const formattedDate = new Date(values.expiry_date).toISOString().split('T')[0];
      console.log("Formatted Expiry Date: ", formattedDate);
      formData.append("expiry_date", formattedDate);
    
      const accessToken = token; // Use token from location state
      if (!accessToken) {
        console.error("No access token found!");
        return;
      }
    
      // Log the FormData contents correctly
      console.log("FormData content:");
      formData.forEach((value, key) => {
        // Check if the value is a File or a String and log accordingly
        if (value instanceof File) {
          console.log(`${key}: File, name: ${value.name}, type: ${value.type}`);
        } else {
          console.log(`${key}: ${value}, type: ${typeof(value)}`);
        }
      });
    
      try {
        const response = await axios.post('https://api.fastrakconnect.com/upload/', formData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
    
        if (response.status === 201) {
          console.log('File uploaded successfully:', response.data);
          // Handle success
        }
      } catch (error) {
        console.error('Error uploading file:', error);
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
          <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            id="expiry_date"
            name="expiry_date"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expiry_date}
          />
          {formik.touched.expiry_date && formik.errors.expiry_date ? (
            <div className="text-red-500 text-sm">{formik.errors.expiry_date}</div>
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

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUploadFileMutation } from "../services/uploadApi.js"; // Import the upload mutation hook

const DriveForm = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadFile] = useUploadFileMutation(); // Initialize RTK Query hook

  const initialValues = {
    title: "",
    description: "",
    documentId: "",
    expiryDate: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(50, "Title must be 50 characters or less"),
    description: Yup.string()
      .required("Description is required")
      .max(200, "Description must be 200 characters or less"),
    documentId: Yup.string()
      .required("Document ID is required")
      .matches(/^[a-zA-Z0-9_-]+$/, "Invalid Document ID format"),
    expiryDate: Yup.date()
      .required("Expiry Date is required")
      .min(new Date(), "Expiry Date cannot be in the past"),
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("file", uploadedFile); // Add the file to FormData
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("documentId", values.documentId);
    formData.append("expiryDate", values.expiryDate);

    try {
      const response = await uploadFile(formData).unwrap(); // Send the FormData to the API
      console.log("File uploaded successfully:", response);
      // Optionally, handle success response
    } catch (error) {
      console.error("File upload failed:", error);
      // Optionally, handle error
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Drive Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Document ID Field */}
            <div className="mb-4">
              <label htmlFor="documentId" className="block text-sm font-medium text-gray-700">
                Document ID
              </label>
              <Field
                type="text"
                id="documentId"
                name="documentId"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="documentId"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Expiry Date Field */}
            <div className="mb-4">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <Field
                type="date"
                id="expiryDate"
                name="expiryDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="expiryDate"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* File Upload Field */}
            <div className="mb-4">
              <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {uploadedFile && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected File: {uploadedFile.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DriveForm;

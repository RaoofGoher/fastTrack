import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';

// Validation Schema using Yup
const validationSchema = Yup.object({
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
});

const AcceptanceComponent = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Acceptance of Terms & Conditions</h2>

      <Formik
        initialValues={{
          termsAccepted: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form submitted:', values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <div className="border-t-2 border-gray-300 mt-6 pt-4">
              <h3 className="text-lg font-semibold text-gray-700">Terms and Conditions</h3>
              <p className="text-sm text-gray-600">
                <strong>Contract Duration:</strong> 12 months, with automatic renewal unless canceled with 60-day notice.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Due Date:</strong> Payment is due within 30 days of invoice date. Late fees of 1.5% per month apply to overdue balances.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Service Suspension:</strong> FasTrak Connect reserves the right to suspend services if payment is not received within 45 days.
              </p>
            </div>

            {/* Terms Acceptance Checkbox */}
            <div>
              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="termsAccepted"
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">
                  I have read and accept the <span className="font-semibold text-blue-600">Terms and Conditions</span>.
                </span>
              </label>
              {errors.termsAccepted && touched.termsAccepted && (
                <div className="text-red-500 text-sm">{errors.termsAccepted}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-6"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AcceptanceComponent;

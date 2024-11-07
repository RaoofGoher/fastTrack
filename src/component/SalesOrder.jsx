import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

// Validation Schema using Yup
const validationSchema = Yup.object({
  salesOrderNo: Yup.string().required('Sales Order No is required'),
  dateOfOrder: Yup.date().required('Date of Order is required').nullable(),
  clientId: Yup.string().required('Client ID is required'),
});

const SalesOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sales Order</h2>

      <Formik
        initialValues={{
          salesOrderNo: '',
          dateOfOrder: '',
          clientId: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form values:', values);
          navigate('/serviceselection');
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            {/* Sales Order No */}
            <div>
              <label htmlFor="salesOrderNo" className="block text-sm font-semibold text-gray-700">
                Sales Order No *
              </label>
              <Field
                type="text"
                id="salesOrderNo"
                name="salesOrderNo"
                className={`mt-2 p-2 w-full border ${errors.salesOrderNo && touched.salesOrderNo ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.salesOrderNo && touched.salesOrderNo && (
                <div className="text-red-500 text-sm">{errors.salesOrderNo}</div>
              )}
            </div>

            {/* Date of Order */}
            <div>
              <label htmlFor="dateOfOrder" className="block text-sm font-semibold text-gray-700">
                Date of Order *
              </label>
              <Field
                type="date"
                id="dateOfOrder"
                name="dateOfOrder"
                className={`mt-2 p-2 w-full border ${errors.dateOfOrder && touched.dateOfOrder ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.dateOfOrder && touched.dateOfOrder && (
                <div className="text-red-500 text-sm">{errors.dateOfOrder}</div>
              )}
            </div>

            {/* Client ID */}
            <div>
              <label htmlFor="clientId" className="block text-sm font-semibold text-gray-700">
                Client ID *
              </label>
              <Field
                type="text"
                id="clientId"
                name="clientId"
                className={`mt-2 p-2 w-full border ${errors.clientId && touched.clientId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.clientId && touched.clientId && (
                <div className="text-red-500 text-sm">{errors.clientId}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Submit & Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SalesOrder;

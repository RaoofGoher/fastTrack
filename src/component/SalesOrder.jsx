import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCreateOrderMutation } from '../services/orderApi';

// Validation Schema using Yup
const validationSchema = Yup.object({
  salesOrderNo: Yup.string().required('Sales Order No is required'),
  order_date: Yup.date().required('Date of Order is required').nullable(),
  clientId: Yup.string().required('Client ID is required'),
});

const SalesOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { clientId, orderId , id } = location.state || {};
  const [createOrder, { isLoading, isSuccess, isError }] = useCreateOrderMutation();

  const handleSubmit = async (values) => {
    // Send the order data to the API
    try {
     const response = await createOrder({
      order_date: values.order_date,
      client_id:id
      }).unwrap(); // unwrap to get the result or handle the error

      console.log("sales Order",response)
      navigate('/serviceselection'
        , {
          state: {
            orderId: response.order_pk_id,
          },
        }

      ); // Navigate after successful order creation
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sales Order</h2>

      <Formik
        initialValues={{
          salesOrderNo:  orderId || '',
          order_date: '',
          clientId: clientId || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              <label htmlFor="order_date" className="block text-sm font-semibold text-gray-700">
                Date of Order *
              </label>
              <Field
                type="date"
                id="order_date"
                name="order_date"
                className={`mt-2 p-2 w-full border ${errors.order_date && touched.order_date ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.order_date && touched.order_date && (
                <div className="text-red-500 text-sm">{errors.order_date}</div>
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
            <div className="flex justify-between mt-6">
              {/* <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="reset"
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button> */}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Save & Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SalesOrder;

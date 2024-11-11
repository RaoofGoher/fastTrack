import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import { useAddClientMutation } from '../services/clientApi';

// Validation Schema using Yup
const validationSchema = Yup.object({
  client_name: Yup.string().required('Client Name is required'),
  business_name: Yup.string().required('Business Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  // contactPerson: Yup.string().required('Contact Person is required'),
  phone_number: Yup.string().required('Phone Number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid'),
  client_email: Yup.string().email('Invalid email address').required('Email Address is required'),
});

const ClientInformation = () => {
  const navigate = useNavigate();
  const [addClient] = useAddClientMutation();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Client Information</h2>

      <Formik
        initialValues={{
          client_name: '',
          business_name: '',
          address: '',
          city: '',
          country: '',
          // contactPerson: '',
          phone_number: '',
          client_email: '',
        }}
        validationSchema={validationSchema}
         onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await addClient(values).unwrap();
            console.log("client info", response);
            navigate('/salesorder', {
              state: {
                clientId: response.client.client_id,
                orderId: response.order_id,
                id:response.client.id
              },
            });
          } catch (error) {
            console.error('Failed to submit client information:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Client Name */}
              <div>
                <label htmlFor="client_name" className="block text-sm font-semibold text-gray-700">
                  Client Name *
                </label>
                <Field
                  type="text"
                  id="client_name"
                  name="client_name"
                  className={`mt-2 p-2 w-full border ${errors.client_name && touched.client_name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.client_name && touched.client_name && (
                  <div className="text-red-500 text-sm">{errors.client_name}</div>
                )}
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor="business_name" className="block text-sm font-semibold text-gray-700">
                  Business Name *
                </label>
                <Field
                  type="text"
                  id="business_name"
                  name="business_name"
                  className={`mt-2 p-2 w-full border ${errors.business_name && touched.business_name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.business_name && touched.business_name && (
                  <div className="text-red-500 text-sm">{errors.business_name}</div>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                  Address *
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className={`mt-2 p-2 w-full border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 text-sm">{errors.address}</div>
                )}
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
                  City *
                </label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  className={`mt-2 p-2 w-full border ${errors.city && touched.city ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.city && touched.city && (
                  <div className="text-red-500 text-sm">{errors.city}</div>
                )}
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700">
                  Country *
                </label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  className={`mt-2 p-2 w-full border ${errors.country && touched.country ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.country && touched.country && (
                  <div className="text-red-500 text-sm">{errors.country}</div>
                )}
              </div>

              {/* Contact Person */}
              {/* <div>
                <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700">
                  Contact Person *
                </label>
                <Field
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  className={`mt-2 p-2 w-full border ${errors.contactPerson && touched.contactPerson ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.contactPerson && touched.contactPerson && (
                  <div className="text-red-500 text-sm">{errors.contactPerson}</div>
                )}
              </div> */}

              {/* Phone Number */}
              <div>
                <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-700">
                  Phone Number *
                </label>
                <Field
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className={`mt-2 p-2 w-full border ${errors.phone_number && touched.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.phone_number && touched.phone_number && (
                  <div className="text-red-500 text-sm">{errors.phone_number}</div>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="client_email" className="block text-sm font-semibold text-gray-700">
                  Email Address *
                </label>
                <Field
                  type="email"
                  id="client_email"
                  name="client_email"
                  className={`mt-2 p-2 w-full border ${errors.client_email && touched.client_email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors.client_email && touched.client_email && (
                  <div className="text-red-500 text-sm">{errors.client_email}</div>
                )}
              </div>
            </div>

            {/* Buttons */}
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

export default ClientInformation;

import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';

// Validation Schema using Yup
const validationSchema = Yup.object({
  clientName: Yup.string().required('Client Name is required'),
  businessName: Yup.string().required('Business Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  contactPerson: Yup.string().required('Contact Person is required'),
  phoneNumber: Yup.string().required('Phone Number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid'),
  emailAddress: Yup.string().email('Invalid email address').required('Email Address is required'),
});

const ClientInformation = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Client Information</h2>

      <Formik
        initialValues={{
          clientName: '',
          businessName: '',
          address: '',
          city: '',
          country: '',
          contactPerson: '',
          phoneNumber: '',
          emailAddress: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form values:', values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            {/* Client Name */}
            <div>
              <label htmlFor="clientName" className="block text-sm font-semibold text-gray-700">
                Client Name *
              </label>
              <Field
                type="text"
                id="clientName"
                name="clientName"
                className={`mt-2 p-2 w-full border ${errors.clientName && touched.clientName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.clientName && touched.clientName && (
                <div className="text-red-500 text-sm">{errors.clientName}</div>
              )}
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700">
                Business Name *
              </label>
              <Field
                type="text"
                id="businessName"
                name="businessName"
                className={`mt-2 p-2 w-full border ${errors.businessName && touched.businessName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.businessName && touched.businessName && (
                <div className="text-red-500 text-sm">{errors.businessName}</div>
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
            <div>
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
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">
                Phone Number *
              </label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className={`mt-2 p-2 w-full border ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-semibold text-gray-700">
                Email Address *
              </label>
              <Field
                type="email"
                id="emailAddress"
                name="emailAddress"
                className={`mt-2 p-2 w-full border ${errors.emailAddress && touched.emailAddress ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.emailAddress && touched.emailAddress && (
                <div className="text-red-500 text-sm">{errors.emailAddress}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
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

export default ClientInformation;

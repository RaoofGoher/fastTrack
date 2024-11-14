import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const Confirmation = () => {
  const validationSchema = Yup.object({
    certification: Yup.boolean().oneOf([true], 'You must certify the information provided'),
    date: Yup.date().required('Date is required'),
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Formik
        initialValues={{
          certification: false,
          date: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="certification"
                  className="mr-2 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                />
                <label className="text-lg font-medium text-gray-700">
                  I certify that all information provided is accurate and complete to the best of my knowledge.
                </label>
              </div>
              {errors.certification && touched.certification && (
                <div className="text-red-500 text-sm mt-1">{errors.certification}</div>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Date *
              </label>
              <Field
                type="date"
                name="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.date && touched.date && (
                <div className="text-red-500 text-sm mt-1">{errors.date}</div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
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

export default Confirmation;

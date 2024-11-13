import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const AdditionalInformation = () => {
  const validationSchema = Yup.object({
    fasTrakInterest: Yup.string().required('This field is required'),
    strongFit: Yup.string().required('This field is required'),
    eligibleToWork: Yup.string().required('This field is required'),
    howDidYouHear: Yup.string().required('This field is required'),
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Formik
        initialValues={{
          fasTrakInterest: '',
          strongFit: '',
          eligibleToWork: '',
          howDidYouHear: '',
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
              <label className="block text-lg font-medium text-gray-700">
                Why are you interested in joining FasTrak Connect?
              </label>
              <Field
                as="textarea"
                name="fasTrakInterest"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.fasTrakInterest && touched.fasTrakInterest && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.fasTrakInterest}
                </div>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                What makes you a strong fit for this role?
              </label>
              <Field
                as="textarea"
                name="strongFit"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.strongFit && touched.strongFit && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.strongFit}
                </div>
              )}
            </div>

            <div>
              <span className="block text-lg font-medium text-gray-700">
                Are you eligible to work in Rwanda?
              </span>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="eligibleToWork"
                    value="yes"
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="eligibleToWork"
                    value="no"
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {errors.eligibleToWork && touched.eligibleToWork && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.eligibleToWork}
                </div>
              )}
            </div>

            <div>
              <span className="block text-lg font-medium text-gray-700">
                How did you hear about this opportunity?
              </span>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="howDidYouHear"
                    value="Referral"
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Referral</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="howDidYouHear"
                    value="Social Media"
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Social Media</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="howDidYouHear"
                    value="Job Board"
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Job Board</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="howDidYouHear"
                    value="FasTrak Connect Website"
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">FasTrak Connect Website</span>
                </label>
              </div>
              {errors.howDidYouHear && touched.howDidYouHear && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.howDidYouHear}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdditionalInformation;

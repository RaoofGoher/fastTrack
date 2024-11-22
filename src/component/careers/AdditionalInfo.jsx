import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { usePostAdditionalInfoMutation } from '../../services/career/additionalInfo';
import { useSelector } from 'react-redux';

const AdditionalInformation = () => {
  const navigate = useNavigate();
  const applicantId = useSelector((state) => state.personalInfo.applicantId);

  const [postAdditionalInfo] = usePostAdditionalInfoMutation();

  // Validation schema
  const validationSchema = Yup.object({
    fasTrakInterest: Yup.string().required('Why are you interested is required'),
    strongFit: Yup.string().required('What makes you a strong fit is required'),
    eligibleToWork: Yup.string().required('Eligibility status is required'),
    howDidYouHear: Yup.string().required('Please select an option'),
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
      <Formik
        initialValues={{
          fasTrakInterest: '',
          strongFit: '',
          eligibleToWork: '',
          howDidYouHear: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = {
            job_application: applicantId,
            why_interested: values.fasTrakInterest,
            strong_fit_reason: values.strongFit,
            eligible_to_work: values.eligibleToWork === 'yes',
            source_of_opportunity: values.howDidYouHear,
          };

          try {
            await postAdditionalInfo(payload).unwrap();
            console.log("payload", payload);
            navigate('/attachements');
          } catch (error) {
            console.error('Error submitting form:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting, values }) => (
          <Form className="space-y-6">
            {/* Interest in FasTrak */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Why are you interested in joining FasTrak Connect?
              </label>
              <Field
                as="textarea"
                name="fasTrakInterest"
                rows="4"
                className="mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.fasTrakInterest && touched.fasTrakInterest && (
                <div className="text-red-500 text-sm mt-1">{errors.fasTrakInterest}</div>
              )}
            </div>

            {/* Strong Fit */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                What makes you a strong fit for this role?
              </label>
              <Field
                as="textarea"
                name="strongFit"
                rows="4"
                className="mt-2 w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.strongFit && touched.strongFit && (
                <div className="text-red-500 text-sm mt-1">{errors.strongFit}</div>
              )}
            </div>

            {/* Eligibility */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Are you eligible to work in Rwanda?
              </label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center">
                  <Field type="radio" name="eligibleToWork" value="yes" className="form-radio" />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="flex items-center">
                  <Field type="radio" name="eligibleToWork" value="no" className="form-radio" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {errors.eligibleToWork && touched.eligibleToWork && (
                <div className="text-red-500 text-sm mt-1">{errors.eligibleToWork}</div>
              )}
            </div>

            {/* How did you hear */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                How did you hear about this opportunity?
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {['Referral', 'Social Media'].map((option) => (
                  <label key={option} className="flex items-center">
                    <Field type="radio" name="howDidYouHear" value={option} className="form-radio" />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
              {errors.howDidYouHear && touched.howDidYouHear && (
                <div className="text-red-500 text-sm mt-1">{errors.howDidYouHear}</div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md text-white ${
                  isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Next'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdditionalInformation;

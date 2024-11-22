import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { usePostAdditionalInfoMutation, useUpdateAdditionalInfoMutation } from '../../services/career/additionalInfo';
import { useSelector, useDispatch } from 'react-redux';
import { setFormData } from '../../services/career/formDataSlice';
const AdditionalInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applicantId = useSelector((state) => state.personalInfo.applicantId);

  const [postAdditionalInfo] = usePostAdditionalInfoMutation();
  const [updateAdditionalInfo] = useUpdateAdditionalInfoMutation();

  const { additionalInfo } = useSelector((state) => state.formData);

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
          fasTrakInterest: additionalInfo && additionalInfo.why_interested ? additionalInfo.why_interested : "",
          strongFit: additionalInfo && additionalInfo.strong_fit_reason ? additionalInfo.strong_fit_reason : "",
          eligibleToWork: additionalInfo && additionalInfo.eligible_to_work ? additionalInfo.eligible_to_work : "",
          howDidYouHear: additionalInfo && additionalInfo.source_of_opportunity ? additionalInfo.source_of_opportunity : "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = {
            job_application: applicantId,
            why_interested: values.fasTrakInterest,
            strong_fit_reason: values.strongFit,
            eligible_to_work: values.eligibleToWork,
            source_of_opportunity: values.howDidYouHear,
          };

          try {

            if (additionalInfo && additionalInfo.why_interested ) {
              await updateAdditionalInfo({
                applicantId,
                data: values,
              }).unwrap();
              console.log("Updated successfully:", payload);
              navigate('/attachements');
            }else {
              const response = await postAdditionalInfo(payload).unwrap();
              dispatch(setFormData({ componentName: 'additionalInfo', data: payload }));      
              console.log("payload", response);
              navigate('/attachements');

            }
            
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
            <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
             {additionalInfo && additionalInfo?.why_interested ? "Update":"Next"}
            </button>
            <Link to={"/professionalexp"} className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-500 focus:outline-none">Back</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdditionalInformation;

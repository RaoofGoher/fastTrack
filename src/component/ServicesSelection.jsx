import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

// Validation Schema using Yup
const validationSchema = Yup.object({
  servicePlan: Yup.string().required('Service Plan Selection is required'),
  multilingualSupport: Yup.string(),
  afterHoursPremium: Yup.string(),
  technicalSupport: Yup.string(),
  fasTrak: Yup.string(),
  proSIWO: Yup.string(),
  advancedProSIWO: Yup.string(),
});

const ServiceSelection = () => {
  const navigate = useNavigate();

  // Main service plan options
  const servicePlans = [
    { id: '1', label: 'Economy Plan (500 Minutes) - $249' },
    { id: '2', label: 'Basic Plan (1000 Minutes) - $399' },
    { id: '3', label: 'Professional Plan (100 Hours) - $999' },
    { id: '4', label: 'Premium Plan (1 Dedicated Agent) - $1749' },
    { id: '5', label: 'Enterprise Plan (Custom) - Our Agent Contact You' }
  ];

  // Add-on service options
  const addOnServices = {
    multilingualSupport: [
      { id: '1', label: '1 Agent ($200)' },
      { id: '2', label: '2 Agents ($400)' },
      { id: '3', label: '3 Agents ($600)' },
      { id: '4', label: '4 Agents ($800)' },
      { id: '5', label: '5 Agents ($1000)' },
      { id: '6', label: '6 Agents ($1200)' },
      { id: '7', label: '7 Agents ($1400)' },
      { id: '8', label: '8 Agents ($1600)' },
      { id: '9', label: '9 Agents ($1800)' },
      { id: '10', label: '10 Agents ($2000)' }
    ],
    afterHoursPremium: [
      { id: '1', label: '1 hour ($10)' },
      { id: '2', label: '2 hours ($20)' },
      { id: '3', label: '3 hours ($30)' },
      { id: '4', label: '4 hours ($40)' },
      { id: '5', label: '5 hours ($50)' },
      { id: '6', label: '6 hours ($60)' },
      { id: '7', label: '7 hours ($70)' },
      { id: '8', label: '8 hours ($80)' },
      { id: '9', label: '9 hours ($90)' },
      { id: '10', label: '10 hours ($100)' },
      { id: '11', label: '11 hours ($110)' },
      { id: '12', label: '12 hours ($120)' }
    ],
    technicalSupport: [
      { id: '1', label: '1 hour ($12)' },
      { id: '2', label: '2 hours ($24)' },
      { id: '3', label: '3 hours ($36)' },
      { id: '4', label: '4 hours ($48)' },
      { id: '5', label: '5 hours ($60)' },
      { id: '6', label: '6 hours ($72)' },
      { id: '7', label: '7 hours ($84)' },
      { id: '8', label: '8 hours ($96)' },
      { id: '9', label: '9 hours ($108)' },
      { id: '10', label: '10 hours ($120)' },
      { id: '11', label: '11 hours ($132)' },
      { id: '12', label: '12 hours ($144)' }
    ],
    fasTrak: [
      { id: '1', label: '$49/month' }
    ],
    proSIWO: [
      { id: '1', label: '$99/month' }
    ],
    advancedProSIWO: [
      { id: '1', label: '$149/month' }
    ]
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Service Selection</h2>

      <Formik
        initialValues={{
          servicePlan: '',
          multilingualSupport: '',
          afterHoursPremium: '',
          technicalSupport: '',
          fasTrak: '',
          proSIWO: '',
          advancedProSIWO: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form values:', values);
          navigate('/billandpayment');
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Service Plan Selection */}
            <div>
              <label htmlFor="servicePlan" className="block text-sm font-semibold text-gray-700">
                Service Plan Selection *
              </label>
              <Field as="select" name="servicePlan" id="servicePlan" className="mt-2 p-2 w-full border rounded-md">
                <option value="">Select Service Plan</option>
                {servicePlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>{plan.label}</option>
                ))}
              </Field>
              {errors.servicePlan && touched.servicePlan && (
                <div className="text-red-500 text-sm">{errors.servicePlan}</div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mt-4">ADD-ON Services</h3>

            {/* Add-on Services in Two Columns */}
            <div className="grid grid-cols-2 gap-4">
              {/* Multilingual Support */}
              <div>
                <label htmlFor="multilingualSupport" className="block text-sm font-semibold text-gray-700">
                  Multilingual Support
                </label>
                <Field as="select" name="multilingualSupport" id="multilingualSupport" className="mt-2 p-2 w-full border rounded-md">
                  <option value="">Select Multilingual Support (Optional)</option>
                  {addOnServices.multilingualSupport.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      onClick={() => setFieldValue('multilingualSupport', service.id)}
                    >
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.multilingualSupport && touched.multilingualSupport && (
                  <div className="text-red-500 text-sm">{errors.multilingualSupport}</div>
                )}
              </div>

              {/* After-Hours & Holiday Premium */}
              <div>
                <label htmlFor="afterHoursPremium" className="block text-sm font-semibold text-gray-700">
                  After-Hours & Holiday Premium
                </label>
                <Field as="select" name="afterHoursPremium" id="afterHoursPremium" className="mt-2 p-2 w-full border rounded-md">
                  <option value="">Select After-Hours & Holiday Premium (Optional)</option>
                  {addOnServices.afterHoursPremium.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      onClick={() => setFieldValue('afterHoursPremium', service.id)}
                    >
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.afterHoursPremium && touched.afterHoursPremium && (
                  <div className="text-red-500 text-sm">{errors.afterHoursPremium}</div>
                )}
              </div>

              {/* Technical Support */}
              <div>
                <label htmlFor="technicalSupport" className="block text-sm font-semibold text-gray-700">
                  Technical Support
                </label>
                <Field as="select" name="technicalSupport" id="technicalSupport" className="mt-2 p-2 w-full border rounded-md">
                  <option value="">Select Technical Support (Optional)</option>
                  {addOnServices.technicalSupport.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      onClick={() => setFieldValue('technicalSupport', service.id)}
                    >
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.technicalSupport && touched.technicalSupport && (
                  <div className="text-red-500 text-sm">{errors.technicalSupport}</div>
                )}
              </div>

              {/* FasTrak */}
              <div>
                <label htmlFor="fasTrak" className="block text-sm font-semibold text-gray-700">
                  FasTrak
                </label>
                <Field as="select" name="fasTrak" id="fasTrak" className="mt-2 p-2 w-full border rounded-md">
                  <option value="">Select FasTrak (Optional)</option>
                  {addOnServices.fasTrak.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      onClick={() => setFieldValue('fasTrak', service.id)}
                    >
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.fasTrak && touched.fasTrak && (
                  <div className="text-red-500 text-sm">{errors.fasTrak}</div>
                )}
              </div>

              {/* ProSIWO */}
              <div>
                <label htmlFor="proSIWO" className="block text-sm font-semibold text-gray-700">
                  ProSIWO
                </label>
                <Field as="select" name="proSIWO" id="proSIWO" className="mt-2 p-2 w-full border rounded-md">
                  <option value="">Select ProSIWO (Optional)</option>
                  {addOnServices.proSIWO.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      onClick={() => setFieldValue('proSIWO', service.id)}
                    >
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.proSIWO && touched.proSIWO && (
                  <div className="text-red-500 text-sm">{errors.proSIWO}</div>
                )}
              </div>

              {/* Advanced ProSIWO */}
              <div>
                <label htmlFor="advancedProSIWO" className="block text-sm font-semibold text-gray-700">
                  Advanced ProSIWO
                </label>
                <Field as="select" name="advancedProSIWO" id="advancedProSIWO" className="mt-2 p-2 w-full border rounded-md">
                  <option value="">Select Advanced ProSIWO (Optional)</option>
                  {addOnServices.advancedProSIWO.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      onClick={() => setFieldValue('advancedProSIWO', service.id)}
                    >
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.advancedProSIWO && touched.advancedProSIWO && (
                  <div className="text-red-500 text-sm">{errors.advancedProSIWO}</div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
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
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
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

export default ServiceSelection;

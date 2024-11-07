import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';

// Validation Schema using Yup
const validationSchema = Yup.object({
  servicePlan: Yup.string().required('Service Plan Selection is required'),
  // Make add-on services optional
  multilingualSupport: Yup.string(),
  afterHoursPremium: Yup.string(),
  technicalSupport: Yup.string(),
  fasTrak: Yup.string(),
  proSIWO: Yup.string(),
  advancedProSIWO: Yup.string(),
});

const ServiceSelection = () => {
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
                    onClick={() => {
                      setFieldValue('multilingualSupport', service.id);
                      console.log(`Multilingual Support selected: ${service.label} - ID: ${service.id}`);
                    }}
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
                    onClick={() => {
                      setFieldValue('afterHoursPremium', service.id);
                      console.log(`After-Hours Premium selected: ${service.label} - ID: ${service.id}`);
                    }}
                  >
                    {service.label}
                  </option>
                ))}
              </Field>
              {errors.afterHoursPremium && touched.afterHoursPremium && (
                <div className="text-red-500 text-sm">{errors.afterHoursPremium}</div>
              )}
            </div>

            {/* Other Add-On Dropdowns */}
            {/* Repeat the same structure for technicalSupport, fasTrak, proSIWO, and advancedProSIWO dropdowns */}

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

export default ServiceSelection;

import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCreateOrderBillingMutation } from '../services/fastrackApi';
// Validation Schema using Yup
const validationSchema = Yup.object({
  servicePlan: Yup.string().required('Service Plan Selection is required'),
  multilingualSupport: Yup.string(),
  afterHoursPremium: Yup.string(),
  technicalSupport: Yup.string(),
  fasTrak: Yup.string(),
  proSIWO: Yup.string(),
  advancedProSIWO: Yup.string(),
   billing_details: Yup.object({
      billing_cycle: Yup.string().required('Billing cycle is required'),
      payment_method: Yup.string().required('Payment method is required'),
    }),
});

const ServiceSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [createOrderBilling] = useCreateOrderBillingMutation();
  const { orderId } = location.state || {};
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
  const handleSubmit = async (values) => {
    console.log('values', values);
  
    // Prepare the payload to send to the API
    const payload = {
      services_selected: {
        service_plan: {
          id: values.servicePlan ? parseInt(values.servicePlan) : undefined, // Only include if valid
        },
        multilingual_support: values.multilingualSupport ? { agents: parseInt(values.multilingualSupport) } : undefined,
        after_hours_holiday_premium: values.afterHoursPremium ? { hours: parseInt(values.afterHoursPremium) } : undefined,
        technical_support: values.technicalSupport ? { hours: parseInt(values.technicalSupport) } : undefined,
        fastrak_briefcase: values.fasTrak ? { price_per_month: 50 } : undefined,  // Adjust price as per selection
        starter_prosiwo: values.proSIWO ? { price_per_month: 30 } : undefined,    // Adjust price as per selection
        advanced_prosiwo: values.advancedProSIWO ? { price_per_month: 80 } : undefined,  // Adjust price as per selection
      },
      billing_details: {
        billing_cycle: values.billingCycle || 'annual',  // Default to 'annual' if not provided
        payment_method: values.billing_details?.payment_method || 'cash',  // Default to 'cash'
      },
    };
  
    // Clean out any undefined properties from the payload
    const cleanedPayload = JSON.parse(JSON.stringify(payload));  // Remove undefined values
    Object.keys(cleanedPayload.services_selected).forEach((key) => {
      if (cleanedPayload.services_selected[key] === undefined) {
        delete cleanedPayload.services_selected[key];
      }
    });
  
    console.log('Cleaned Payload:', cleanedPayload);
  
    try {
      const response = await createOrderBilling({ orderId, payload: cleanedPayload }).unwrap();
      console.log('Order created successfully:', response);
      navigate('/invoice'
        , {
          state: {
            data: response,
          },
        }
      )
    } catch (error) {
      console.error('Failed to create order:', error);
    }
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
          advancedProSIWO: '',
          billingCycle: '',
          billing_details: {
            billing_cycle: 'annual', // Default billing cycle
            payment_method: 'cash', // Default payment method
          },
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
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
                    <option key={service.id} value={service.id}>
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
                    <option key={service.id} value={service.id}>
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
                    <option key={service.id} value={service.id}>
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
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.fasTrak && touched.fasTrak && (
                  <div className="text-red-500 text-sm">{errors.fasTrak}</div>
                )}
              </div>

              {/* Pro SIWO */}
              <div>
                <label htmlFor="proSIWO" className="block text-sm font-semibold text-gray-700">
                  Pro SIWO
                </label>
                <Field as="select" name="proSIWO" id="proSIWO" className="mt-2 p-2 w-full border rounded-md">
                  <option value="">Select Pro SIWO (Optional)</option>
                  {addOnServices.proSIWO.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.proSIWO && touched.proSIWO && (
                  <div className="text-red-500 text-sm">{errors.proSIWO}</div>
                )}
              </div>

              {/* Advanced Pro SIWO */}
              <div>
                <label htmlFor="advancedProSIWO" className="block text-sm font-semibold text-gray-700">
                  Advanced Pro SIWO
                </label>
                <Field as="select" name="advancedProSIWO" id="advancedProSIWO" className="mt-2 p-2 w-full border rounded-md">
                  <option value="">Select Advanced Pro SIWO (Optional)</option>
                  {addOnServices.advancedProSIWO.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </Field>
                {errors.advancedProSIWO && touched.advancedProSIWO && (
                  <div className="text-red-500 text-sm">{errors.advancedProSIWO}</div>
                )}
              </div>
            </div>

            {/* Billing Cycle */}
            <div>
              <label htmlFor="billingCycle" className="block text-sm font-semibold text-gray-700">
                Billing Cycle Selection *
              </label>
              <Field as="select" name="billingCycle" id="billingCycle" className="mt-2 p-2 w-full border rounded-md">
                <option value="">Select Billing Cycle</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annually</option>
              </Field>
              {errors.billingCycle && touched.billingCycle && (
                <div className="text-red-500 text-sm">{errors.billingCycle}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md">
                Proceed to Invoice
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ServiceSelection;

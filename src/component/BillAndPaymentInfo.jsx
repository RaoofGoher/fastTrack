import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

const BillAndPaymentInformation = () => {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    // Billing Cycle Validation
    if (!values.billingCycle) {
      errors.billingCycle = 'Billing Cycle is required';
    }

    // Payment Method Validation
    if (!values.paymentMethod) {
      errors.paymentMethod = 'Payment Method is required';
    }

    // Preferred Invoice Delivery Validation
    if (!values.invoiceDelivery) {
      errors.invoiceDelivery = 'Preferred Invoice Delivery is required';
    }

    // Credit Card Validation
    if (values.paymentMethod === 'Credit Card') {
      if (!values.creditCardNumber) {
        errors.creditCardNumber = 'Credit Card Number is required';
      } else if (!/^[0-9]{16}$/.test(values.creditCardNumber)) {
        errors.creditCardNumber = 'Credit Card Number must be 16 digits';
      }
    }

    return errors;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Bill & Payment Information</h2>

      <Formik
        initialValues={{
          billingCycle: '',
          paymentMethod: '',
          invoiceDelivery: '',
          creditCardNumber: '',
        }}
        validate={validate}
        onSubmit={(values) => {
          console.log('Form values:', values);
          navigate('/acceptance');
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
          <Form className="space-y-6">
            {/* Billing Cycle Radio Buttons */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Billing Cycle *</label>
              <div className="mt-2 space-y-2">
                <div>
                  <Field
                    type="radio"
                    id="billingCycleMonthly"
                    name="billingCycle"
                    value="Monthly"
                    className="mr-2"
                  />
                  <label htmlFor="billingCycleMonthly" className="text-sm text-gray-700">1-Monthly</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    id="billingCycleQuarterly"
                    name="billingCycle"
                    value="Quarterly"
                    className="mr-2"
                  />
                  <label htmlFor="billingCycleQuarterly" className="text-sm text-gray-700">2-Quarterly</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    id="billingCycleAnnual"
                    name="billingCycle"
                    value="Annual"
                    className="mr-2"
                  />
                  <label htmlFor="billingCycleAnnual" className="text-sm text-gray-700">3-Annual (10% discount applied)</label>
                </div>
              </div>
              {errors.billingCycle && touched.billingCycle && (
                <div className="text-red-500 text-sm">{errors.billingCycle}</div>
              )}
            </div>

            {/* Payment Method Radio Buttons */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Payment Method *</label>
              <div className="mt-2 space-y-2">
                <div>
                  <Field
                    type="radio"
                    id="paymentMethodCreditCard"
                    name="paymentMethod"
                    value="Credit Card"
                    className="mr-2"
                  />
                  <label htmlFor="paymentMethodCreditCard" className="text-sm text-gray-700">1-Credit Card (2% processing fee)</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    id="paymentMethodACH"
                    name="paymentMethod"
                    value="ACH Transfer"
                    className="mr-2"
                  />
                  <label htmlFor="paymentMethodACH" className="text-sm text-gray-700">2-ACH Transfer</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    id="paymentMethodBank"
                    name="paymentMethod"
                    value="Bank Transfer"
                    className="mr-2"
                  />
                  <label htmlFor="paymentMethodBank" className="text-sm text-gray-700">3-Bank Transfer</label>
                </div>
              </div>
              {errors.paymentMethod && touched.paymentMethod && (
                <div className="text-red-500 text-sm">{errors.paymentMethod}</div>
              )}
            </div>

            {/* Credit Card Number Field (only visible if "Credit Card" is selected) */}
            {values.paymentMethod === 'Credit Card' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">Credit Card Number</label>
                <Field
                  type="text"
                  name="creditCardNumber"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter 16-digit Credit Card Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.creditCardNumber && touched.creditCardNumber && (
                  <div className="text-red-500 text-sm">{errors.creditCardNumber}</div>
                )}
              </div>
            )}

            {/* Preferred Invoice Delivery Radio Buttons */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Preferred Invoice Delivery *</label>
              <div className="mt-2 space-y-2">
                <div>
                  <Field
                    type="radio"
                    id="invoiceDeliveryEmail"
                    name="invoiceDelivery"
                    value="Email"
                    className="mr-2"
                  />
                  <label htmlFor="invoiceDeliveryEmail" className="text-sm text-gray-700">1-Email</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    id="invoiceDeliveryText"
                    name="invoiceDelivery"
                    value="Text"
                    className="mr-2"
                  />
                  <label htmlFor="invoiceDeliveryText" className="text-sm text-gray-700">2-Text</label>
                </div>
              </div>
              {errors.invoiceDelivery && touched.invoiceDelivery && (
                <div className="text-red-500 text-sm">{errors.invoiceDelivery}</div>
              )}
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

export default BillAndPaymentInformation;

import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';

// Validation Schema using Yup
const validationSchema = Yup.object({
  billingCycle: Yup.string().required('Billing Cycle is required'),
  paymentMethod: Yup.string().required('Payment Method is required'),
  invoiceDelivery: Yup.string().required('Preferred Invoice Delivery is required'),
  creditCardNumber: Yup.string()
    .when('paymentMethod', {
      is: 'Credit Card',
      then: Yup.string().required('Credit Card Number is required'),
    })
    .matches(/^[0-9]{16}$/, 'Credit Card Number must be 16 digits'),
});

const BillAndPaymentInformation = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

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
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form values:', values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Billing Cycle Radio Buttons */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Billing Cycle *</label>
              <div className="mt-2 space-y-2">
                <div>
                  <Field type="radio" name="billingCycle" value="Monthly" className="mr-2" />
                  <label htmlFor="billingCycle" className="text-sm text-gray-700">1-Monthly</label>
                </div>
                <div>
                  <Field type="radio" name="billingCycle" value="Quarterly" className="mr-2" />
                  <label htmlFor="billingCycle" className="text-sm text-gray-700">2-Quarterly</label>
                </div>
                <div>
                  <Field type="radio" name="billingCycle" value="Annual" className="mr-2" />
                  <label htmlFor="billingCycle" className="text-sm text-gray-700">3-Annual (10% discount applied)</label>
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
                    name="paymentMethod"
                    value="Credit Card"
                    className="mr-2"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paymentMethod" className="text-sm text-gray-700">1-Credit Card (2% processing fee)</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="ACH Transfer"
                    className="mr-2"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paymentMethod" className="text-sm text-gray-700">2-ACH Transfer</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="Bank Transfer"
                    className="mr-2"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paymentMethod" className="text-sm text-gray-700">3-Bank Transfer</label>
                </div>
              </div>
              {errors.paymentMethod && touched.paymentMethod && (
                <div className="text-red-500 text-sm">{errors.paymentMethod}</div>
              )}
            </div>

            {/* Credit Card Number Field (only visible if "Credit Card" is selected) */}
            {paymentMethod === 'Credit Card' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">Credit Card Number</label>
                <Field
                  type="text"
                  name="creditCardNumber"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter 16-digit Credit Card Number"
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
                  <Field type="radio" name="invoiceDelivery" value="Email" className="mr-2" />
                  <label htmlFor="invoiceDelivery" className="text-sm text-gray-700">1-Email</label>
                </div>
                <div>
                  <Field type="radio" name="invoiceDelivery" value="Text" className="mr-2" />
                  <label htmlFor="invoiceDelivery" className="text-sm text-gray-700">2-Text</label>
                </div>
              </div>
              {errors.invoiceDelivery && touched.invoiceDelivery && (
                <div className="text-red-500 text-sm">{errors.invoiceDelivery}</div>
              )}
            </div>

            {/* Terms and Conditions Section */}
            <div className="border-t-2 border-gray-300 mt-6 pt-4">
              <h3 className="text-lg font-semibold text-gray-700">Terms and Conditions</h3>
              <p className="text-sm text-gray-600">
                <strong>Contract Duration:</strong> 12 months, with automatic renewal unless canceled with 60-day notice.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Due Date:</strong> Payment is due within 30 days of invoice date. Late fees of 1.5% per month apply to overdue balances.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Service Suspension:</strong> FasTrak Connect reserves the right to suspend services if payment is not received within 45 days.
              </p>
            </div>

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

export default BillAndPaymentInformation;

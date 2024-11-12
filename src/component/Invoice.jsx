import React from 'react';
import { useLocation } from 'react-router-dom';
const InvoiceComponent = () => {
    const location = useLocation();
    const { data } = location.state || {};
  const {
    order_id,
    client: { client_email, business_name },
    services_selected,
    total_amount: { subtotal, total_after_discount },
  } = data;

  const serviceEntries = [
    { label: "Service Plan", name: services_selected.service_plan.name, price: services_selected.service_plan.price },
    { label: "Advanced Prosiwo", price: services_selected.advanced_prosiwo.price_per_month },
    { label: "After Hours Holiday Premium", price: services_selected.after_hours_holiday_premium.total_price },
    { label: "Fastrak Briefcase", price: services_selected.fastrak_briefcase.price_per_month },
    { label: "Multilingual Support", price: services_selected.multilingual_support.total_price },
    { label: "Starter Prosiwo", price: services_selected.starter_prosiwo.price_per_month },
    { label: "Technical Support", price: services_selected.technical_support.total_price },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto border border-gray-300 shadow-md rounded-md bg-white">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Invoice</h1>

      {/* Order Details */}
      <div className="mb-4">
        <div className="flex justify-between">
          <span className="font-bold text-gray-700">Order ID:</span>
          <span className="text-gray-600">{order_id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-gray-700">Client Email:</span>
          <span className="text-gray-600">{client_email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-gray-700">Business Name:</span>
          <span className="text-gray-600">{business_name}</span>
        </div>
      </div>

      {/* Services Selected */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Services Selected</h2>
        <div className="space-y-2">
          {serviceEntries.map(({ label, name, price }, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-700">{label} {name ? `(${name})` : ""}:</span>
              <span className="text-gray-600">${price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Amount */}
      <div className="border-t border-gray-300 pt-4">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Subtotal:</span>
          <span className="text-gray-600">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Total After Discount:</span>
          <span className="text-gray-600">${total_after_discount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Import jsPDF

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

    // Function to generate and download PDF
    const downloadInvoice = () => {
        const doc = new jsPDF();
        doc.setFont('helvetica', 'normal');  // Set font type
        doc.setFontSize(12);
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Draw a border around the whole document
        doc.setDrawColor(0, 0, 0); // Set the border color (black)
        doc.setLineWidth(2); // Set the border width

        // The border will be drawn around the entire page
        doc.rect(0, 0, pageWidth, pageHeight); // x, y, width, height

        // Add FASTRAK CONNECT details
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0); // Black text for heading
        doc.text('FASTRAK CONNECT', 14, 20);
        doc.setFontSize(12);
        doc.text('MANAGED SERVICE RELATIONSHIP', 14, 30);
        doc.text('(347) 246-4700', 14, 40);
        doc.text('info@fastrakconnect.com', 14, 50);
        doc.text('24/7, 365 days Live Support', 14, 60);

        // Add some space before starting the invoice
        let yOffset = 70;
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 0, 0); // Black color for the line
        doc.line(14, yOffset + 10, 200, yOffset + 10);  // Horizontal line
        yOffset += 20;

        // Add invoice header
        doc.setFontSize(18);
        doc.text('Invoice', 14, yOffset);
        yOffset += 20;

        // Add order details with a styled table
        doc.setFontSize(12);
        doc.text(`Order ID: ${order_id}`, 14, yOffset);
        yOffset += 10;
        doc.text(`Client Email: ${client_email}`, 14, yOffset);
        yOffset += 10;
        doc.text(`Business Name: ${business_name}`, 14, yOffset);

        yOffset += 20; // Add some space before services list

        // Add a header for services table
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black text for the header
        doc.text('Services Selected', 14, yOffset);
        yOffset += 10;

        // Add service entries with pricing
        serviceEntries.forEach(({ label, name, price }) => {
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100); // Grey for service items
            doc.text(`${label} ${name ? `(${name})` : ''}: $${price.toFixed(2)}`, 14, yOffset);
            yOffset += 10;
        });

        yOffset += 20; // Add space before total section

        // Add totals
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black text for totals
        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, yOffset);
        yOffset += 10;
        doc.text(`Total After Discount: $${total_after_discount.toFixed(2)}`, 14, yOffset);

        // Add a horizontal line before the totals
        doc.setLineWidth(0.5); 
        doc.setDrawColor(0, 0, 0); // Black color for the line
        doc.line(14, yOffset + 10, 200, yOffset + 10);  // Horizontal line
        yOffset += 20;

        // Add the footer
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150); // Light gray footer
        doc.text('Thank you for your business!', 14, yOffset);

        // Save the PDF
        doc.save(`invoice_${order_id}.pdf`);
    };

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

            {/* Download Invoice Button */}
            <div className="mt-6">
                <button
                    onClick={downloadInvoice}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Download Invoice as PDF
                </button>
            </div>
        </div>
    );
};

export default InvoiceComponent;

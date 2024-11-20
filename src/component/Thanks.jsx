import React from 'react'

const Thanks = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-sky-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-6">
          We have received your details successfully. Our team will get in touch with you shortly!
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default Thanks;

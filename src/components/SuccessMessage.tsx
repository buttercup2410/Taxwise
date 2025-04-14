import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your tax information has been successfully submitted. We'll process your information and contact you if we need any additional details.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
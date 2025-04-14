import React from 'react';

const ReasonableSalaryForm = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reasonable Salary</h2>
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          A "reasonable salary" is what the IRS expects S-Corporation owners to pay themselves as employees. 
          This amount should be comparable to what other businesses would pay for similar services in your industry. 
          The IRS scrutinizes S-Corp owner compensation to ensure they're not avoiding payroll taxes by taking too 
          much compensation as distributions instead of salary.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="reasonableSalary" className="block text-sm font-medium text-gray-700">Reasonable Salary Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="reasonableSalary"
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonableSalaryForm;
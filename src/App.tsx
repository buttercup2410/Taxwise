import React, { useState } from 'react';
import { TaxFormProvider } from './context/TaxFormContext';
import PersonalInfoForm from './components/PersonalInfoForm';
import IncomeForm from './components/IncomeForm';
import SCorpExpensesForm from './components/SCorpExpensesForm';
import ReasonableSalaryForm from './components/ReasonableSalaryForm';
import SuccessMessage from './components/SuccessMessage';
import { useTaxForm } from './context/TaxFormContext';

const steps = [
  { id: 1, name: 'Personal Info', component: PersonalInfoForm },
  { id: 2, name: 'Income', component: IncomeForm },
  { id: 3, name: 'Expenses', component: SCorpExpensesForm },
  { id: 4, name: 'Reasonable Salary', component: ReasonableSalaryForm },
];

function AppContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { submitForm } = useTaxForm();

  if (showSuccess) {
    return <SuccessMessage />;
  }

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component || PersonalInfoForm;

  const handleSubmit = async () => {
    try {
      await submitForm();
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to submit form:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.id === currentStep
                      ? 'bg-blue-600 text-white'
                      : step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  {step.id}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-900">{step.name}</div>
                {step.id !== steps.length && (
                  <div
                    className={`w-full h-1 mx-4 ${
                      step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <CurrentStepComponent />

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-md ${
              currentStep === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep === steps.length) {
                handleSubmit();
              } else {
                setCurrentStep(prev => Math.min(steps.length, prev + 1));
              }
            }}
            className={`px-4 py-2 rounded-md ${
              currentStep === steps.length
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {currentStep === steps.length ? 'Submit Tax Information' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <TaxFormProvider>
      <AppContent />
    </TaxFormProvider>
  );
}

export default App;
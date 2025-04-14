import React, { createContext, useContext, useState } from 'react';

interface TaxFormData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    ssn: string;
  };
  income: {
    personalIncome: number;
    sCorpIncome: number;
  };
  expenses: {
    businessExpenses: number;
    ownerWithdrawals: number;
    distributions: number;
  };
  reasonableSalary: {
    amount: number;
  };
}

interface TaxFormContextType {
  formData: TaxFormData;
  updateFormData: (section: keyof TaxFormData, data: any) => void;
  submitForm: () => Promise<void>;
}

const defaultFormData: TaxFormData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    ssn: '',
  },
  income: {
    personalIncome: 0,
    sCorpIncome: 0,
  },
  expenses: {
    businessExpenses: 0,
    ownerWithdrawals: 0,
    distributions: 0,
  },
  reasonableSalary: {
    amount: 0,
  },
};

const TaxFormContext = createContext<TaxFormContextType | undefined>(undefined);

export const TaxFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<TaxFormData>(defaultFormData);

  const updateFormData = (section: keyof TaxFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const submitForm = async () => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      if (data.success) {
        console.log('Form submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <TaxFormContext.Provider value={{ formData, updateFormData, submitForm }}>
      {children}
    </TaxFormContext.Provider>
  );
};

export const useTaxForm = () => {
  const context = useContext(TaxFormContext);
  if (context === undefined) {
    throw new Error('useTaxForm must be used within a TaxFormProvider');
  }
  return context;
};
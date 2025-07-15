
import React from 'react';

type FormFieldProps = {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormField = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  error,
  disabled = false,
  onChange
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-white font-medium text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm text-white rounded-xl border transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-viralOrange/50 ${
            error 
              ? "border-red-500/60 focus:border-red-500" 
              : "border-gray-700/50 focus:border-viralOrange/60 hover:border-gray-600/50"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={disabled}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;

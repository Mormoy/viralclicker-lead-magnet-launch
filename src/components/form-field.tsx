
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
    <div>
      <label htmlFor={id} className="block text-white mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 bg-gray-800 text-white rounded border ${
          error ? "border-red-500" : "border-gray-700"
        } focus:border-viralOrange focus:outline-none`}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;

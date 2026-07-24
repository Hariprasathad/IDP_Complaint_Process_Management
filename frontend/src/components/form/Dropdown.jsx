import React from 'react';

const Dropdown = ({ label, placeholder, options, value, onChange, name, error, required }) => {
  return (
    <div className="mb-6 w-full">
      {label && (
        <label className="block text-gray-800 font-bold mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-3 border rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        } ${!value ? 'text-gray-400' : 'text-gray-900'}`}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-gray-900">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Dropdown;

import React from 'react';

const TextInput = ({ label, placeholder, value, onChange, name, error, required }) => {
  return (
    <div className="mb-6 w-full">
      {label && (
        <label className="block text-[#333333] font-medium text-[14px] leading-[21px] tracking-normal mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-[14px] leading-[21px] font-normal tracking-normal text-[#333333] placeholder:text-[#9AA1AB] placeholder:text-[14px] placeholder:leading-[21px] placeholder:font-normal ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;

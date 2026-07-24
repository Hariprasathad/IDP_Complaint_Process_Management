import React from 'react';

const TextArea = ({ label, description, placeholder, value, onChange, name, error, required }) => {
  return (
    <div className="mb-6 w-full">
      {label && (
        <label className="block text-gray-800 font-bold mb-2">
          {label}
        </label>
      )}
      {description && (
        <p className="text-gray-500 text-sm mb-4 whitespace-pre-line leading-relaxed">
          {description}
        </p>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-5 border rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 min-h-[160px] resize-y placeholder:text-gray-400 ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;

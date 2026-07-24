import React from 'react';

const RadioGroup = ({ options, selectedValue, onChange, name, error }) => {
  return (
    <div className="w-full">
      <div className="space-y-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-start cursor-pointer group">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={onChange}
                className="w-5 h-5 text-blue-600 border-gray-400 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="ml-3 text-gray-700">
              {option.label}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RadioGroup;

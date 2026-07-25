import React from 'react';

const RadioGroup = ({ options, selectedValue, onChange, name, error }) => {
  return (
    <div className="w-full">
      <div className="space-y-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-start cursor-pointer group">
            <div className="flex items-center h-6">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={onChange}
                className="w-[16px] h-[16px] text-blue-600 border-gray-400 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="ml-3 text-[#333333] font-normal text-[15px] leading-[24px] tracking-normal">
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

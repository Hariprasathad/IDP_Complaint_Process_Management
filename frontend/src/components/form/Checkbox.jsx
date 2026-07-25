import React from 'react';

const Checkbox = ({ label, checked, onChange, name, error }) => {
  return (
    <div className="mb-3 w-full">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="h-[16px] w-[16px] text-blue-600 border-gray-400 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none"
        />
        <span className="ml-3 text-[#333333] font-normal text-[15px] leading-[24px] tracking-normal">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-500 ml-8">{error}</p>}
    </div>
  );
};

export default Checkbox;

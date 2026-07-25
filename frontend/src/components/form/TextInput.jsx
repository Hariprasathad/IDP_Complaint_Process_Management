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
        className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal tracking-normal text-[#333333] placeholder:text-[#9AA1AB] placeholder:text-[14px] placeholder:leading-[21px] placeholder:font-normal shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none focus:border-[#5C656E] ${
          error ? 'border-red-500 bg-red-50' : 'border-[#5C656E]'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;

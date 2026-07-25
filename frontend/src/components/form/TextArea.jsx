import React from 'react';

const TextArea = ({ label, description, placeholder, value, onChange, name, error, required }) => {
  return (
    <div className="mb-6 w-full">
      {label && (
        <label className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal">
          {label}
        </label>
      )}
      {description && (
        <p className="text-[14px] font-normal leading-[14px] tracking-normal text-[#767676] whitespace-pre-line mt-2">
          {description}
        </p>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full h-[150px] rounded-[8px] border bg-white px-[16px] pt-[14px] pb-[14px] text-[16px] leading-[24px] font-normal text-[#333333] tracking-normal placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:leading-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-y-auto resize-y outline-none focus:border-[#5C656E] ${
          error ? 'border-red-500 bg-red-50' : 'border-[#5C656E]'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useWizardStore from '../../store/wizardStore';
import { step1Schema } from '../../validation/step1Schema';
import FileUploader from '../form/FileUploader';

const MAX_DESCRIPTION_LENGTH = 5000;

const Step1_ComplaintDetails = () => {
  const step1Data = useWizardStore((state) => state.formData);
  const saveStep1 = useWizardStore((state) => state.saveStep1);
  const goNext = useWizardStore((state) => state.goNext);
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      description: step1Data.description,
    },
    mode: 'onBlur',
  });

  const descriptionValue = watch('description') || '';

  const onSubmit = (data) => {
    saveStep1({ description: data.description });
    goNext();
  };

  const { onBlur: rhfOnBlur, ...descriptionRegister } = register('description');

  return (
    <form id="step1-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Label */}
      <label className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal">
        Can you please describe what&apos;s happened? <span className="text-[#EF4444]">*</span>
      </label>

      {/* Helper text */}
      <p className="text-[14px] font-normal leading-[22px] tracking-normal text-[#767676] whitespace-pre-line mt-2">
        {"We'd appreciate as much information and detail as possible\ne.g. what's happened, where and what expectations did you have, etc?"}
      </p>

      {/* Textarea */}
      <textarea
        {...descriptionRegister}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          rhfOnBlur(e);
          if (!descriptionValue) setIsFocused(false);
        }}
        maxLength={MAX_DESCRIPTION_LENGTH}
        placeholder="Start typing your complaint here..."
        className={`w-full min-h-[150px] max-h-[300px] rounded-[8px] border bg-white px-[16px] pt-[14px] pb-[14px] text-[16px] leading-[24px] font-normal text-[#333333] tracking-normal placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:leading-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-y-auto overflow-x-hidden resize-y outline-none focus:border-[#5C656E] mt-5 ${
          errors.description ? 'border-red-500' : 'border-[#5C656E]'
        }`}
      />

      {/* Counter + Validation — fixed height to prevent layout shift */}
      <div className="flex justify-between items-start mt-[2px] min-h-[14px]">
        <div>
          {errors.description && (
            <p className="text-[13px] text-red-500">{errors.description.message}</p>
          )}
        </div>
        <span className={`text-[12px] font-normal leading-[14px] ${
          descriptionValue.length >= MAX_DESCRIPTION_LENGTH ? 'text-red-500' : 'text-[#9AA1AB]'
        } ${(isFocused || descriptionValue.length > 0) ? 'visible' : 'invisible'}`}>
          {descriptionValue.length} / {MAX_DESCRIPTION_LENGTH}
        </span>
      </div>

      {/* File uploader */}
      <div className="mt-[4px]">
        <FileUploader 
          label="Can you share any supporting information and documentation?"
        />
      </div>
    </form>
  );
};

export default Step1_ComplaintDetails;

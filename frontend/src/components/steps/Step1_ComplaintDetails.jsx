import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useWizardStore from '../../store/wizardStore';
import { step1Schema } from '../../validation/step1Schema';
import FileUploader from '../form/FileUploader';

const Step1_ComplaintDetails = () => {
  const step1Data = useWizardStore((state) => state.formData);
  const saveStep1 = useWizardStore((state) => state.saveStep1);
  const goNext = useWizardStore((state) => state.goNext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      description: step1Data.description,
    },
  });

  const onSubmit = (data) => {
    saveStep1({ description: data.description });
    goNext();
  };

  return (
    <form id="step1-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Label */}
      <label className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal">
        Can you please describe what&apos;s happened?
      </label>

      {/* Helper text */}
      <p className="text-[14px] font-normal leading-[14px] tracking-normal text-[#767676] whitespace-pre-line mt-2">
        {"We'd appreciate as much information and detail as possible\ne.g. what's happened, where and what expectations did you have, etc?"}
      </p>

      {/* Textarea */}
      <textarea
        {...register('description')}
        placeholder="Start typing your complaint here..."
        className={`w-full h-[150px] rounded-[8px] border bg-white px-[16px] pt-[14px] pb-[14px] text-[16px] leading-[24px] font-normal text-[#333333] tracking-normal placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:leading-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-y-auto resize-y outline-none focus:border-[#5C656E] mt-3 ${
          errors.description ? 'border-red-500' : 'border-[#5C656E]'
        }`}
      />

      {/* Validation error */}
      {errors.description && (
        <p className="mt-1 text-[13px] text-red-500">{errors.description.message}</p>
      )}

      {/* File uploader */}
      <div className="mt-6">
        <FileUploader 
          label="Can you share any supporting information and documentation?"
        />
      </div>
    </form>
  );
};

export default Step1_ComplaintDetails;

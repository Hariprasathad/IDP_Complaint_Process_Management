import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useWizardStore from '../../store/wizardStore';
import { step3Schema } from '../../validation/step3Schema';

const Step3_WhoIsLodging = () => {
  const step3Data = useWizardStore((state) => state.formData);
  const saveStep3 = useWizardStore((state) => state.saveStep3);
  const goNext = useWizardStore((state) => state.goNext);

  const options = [
    { value: 'student', label: 'I am a Student' },
    { value: 'parent', label: 'I am a Parent of a Student' },
    { value: 'university_member', label: 'I am a member of a University, College or School, sharing on behalf of a Student or Parent' },
    { value: 'other', label: 'Other - Please Specify' },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      complainantType: step3Data.complainantType,
      complainantTypeOther: step3Data.complainantTypeOther,
    },
  });

  const complainantType = watch('complainantType');

  const onSubmit = (data) => {
    saveStep3(data);
    goNext();
  };

  return (
    <form id="step3-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h2 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333]">
        Which of the following best describes you?
      </h2>

      <div className="mt-4 space-y-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-start cursor-pointer group">
            <div className="flex items-center h-6">
              <input
                type="radio"
                value={option.value}
                {...register('complainantType')}
                className="w-[16px] h-[16px] text-blue-600 border-gray-400 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="ml-3 text-[#333333] font-normal text-[15px] leading-[24px] tracking-normal">
              {option.label}
            </div>
          </label>
        ))}
      </div>

      {/* Validation error for radio group */}
      {errors.complainantType && (
        <p className="mt-2 text-[13px] text-red-500">{errors.complainantType.message}</p>
      )}

      {/* Other - Please Specify input */}
      {complainantType === 'other' && (
        <div className="ml-7 mt-3">
          <input
            type="text"
            {...register('complainantTypeOther')}
            placeholder="Please specify"
            className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] placeholder:text-[#9AA1AB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none focus:border-[#5C656E] ${
              errors.complainantTypeOther ? 'border-red-500' : 'border-[#5C656E]'
            }`}
          />
          {errors.complainantTypeOther && (
            <p className="mt-1 text-[13px] text-red-500">{errors.complainantTypeOther.message}</p>
          )}
        </div>
      )}
    </form>
  );
};

export default Step3_WhoIsLodging;

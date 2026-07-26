import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useWizardStore from '../../store/wizardStore';
import { step2Schema } from '../../validation/step2Schema';

const Step2_IncidentLocation = () => {
  const step2Data = useWizardStore((state) => state.formData);
  const saveStep2 = useWizardStore((state) => state.saveStep2);
  const goNext = useWizardStore((state) => state.goNext);

  const countryOptions = [
    { value: 'AU', label: 'Australia' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'IN', label: 'India' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'IE', label: 'Ireland' },
    { value: 'MY', label: 'Malaysia' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'SG', label: 'Singapore' },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step2Schema),
    defaultValues: {
      country: step2Data.country,
      office: step2Data.office,
      isOnline: step2Data.isOnline,
      isOther: step2Data.isOther,
      onlineSpecify: step2Data.onlineSpecify,
    },
  });

  const isOnline = watch('isOnline');
  const isOther = watch('isOther');

  const onSubmit = (data) => {
    saveStep2(data);
    goNext();
  };

  return (
    <form id="step2-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h2 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333]">
        Where did this happen?
      </h2>

      <div className="mt-4 flex flex-col gap-[16px]">
        {/* Country */}
        <div>
          <label className="block text-[#333333] font-medium text-[14px] leading-[21px] tracking-normal mb-1">
            Country
          </label>
          <div className="relative">
            <select
              {...register('country')}
              className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none appearance-none focus:border-[#5C656E] ${
                errors.country ? 'border-red-500' : 'border-[#5C656E]'
              }`}
            >
              <option value="" className="text-[#9AA1AB]">Select country</option>
              {countryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5C656E]">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
          {errors.country && (
            <p className="mt-1 text-[13px] text-red-500">{errors.country.message}</p>
          )}
        </div>

        {/* Office */}
        {!isOnline && (
          <div>
            <label className="block text-[#333333] font-medium text-[14px] leading-[21px] tracking-normal mb-1">
              Office
            </label>
            <input
              type="text"
              {...register('office')}
              placeholder="Type office"
              className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] placeholder:text-[#9AA1AB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none focus:border-[#5C656E] ${
                errors.office ? 'border-red-500' : 'border-[#5C656E]'
              }`}
            />
            {errors.office && (
              <p className="mt-1 text-[13px] text-red-500">{errors.office.message}</p>
            )}
          </div>
        )}

        {/* Other section */}
        <div>
          <span className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal mb-3">
            Other
          </span>

          {/* Online checkbox */}
          <div className="mb-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('isOnline')}
                className="h-[16px] w-[16px] text-blue-600 border-gray-400 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none"
              />
              <span className="ml-3 text-[#333333] font-normal text-[15px] leading-[24px] tracking-normal">
                Online
              </span>
            </label>
          </div>

          {/* Other checkbox */}
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('isOther')}
                className="h-[16px] w-[16px] text-blue-600 border-gray-400 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none"
              />
              <span className="ml-3 text-[#333333] font-normal text-[15px] leading-[24px] tracking-normal">
                Other - Please Specify
              </span>
            </label>
          </div>
        </div>

        {/* Please Specify field */}
        {(isOnline || isOther) && (
          <div className="ml-7">
            <input
              type="text"
              {...register('onlineSpecify')}
              placeholder="Please specify"
              className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] placeholder:text-[#9AA1AB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none focus:border-[#5C656E] ${
                errors.onlineSpecify ? 'border-red-500' : 'border-[#5C656E]'
              }`}
            />
            {errors.onlineSpecify && (
              <p className="mt-1 text-[13px] text-red-500">{errors.onlineSpecify.message}</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default Step2_IncidentLocation;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useWizardStore from '../../store/wizardStore';
import { step4Schema } from '../../validation/step4Schema';
import { submitComplaint } from '../../services/complaintApi';

const Step4_ContactPreference = () => {
  const step4Data = useWizardStore((state) => state.formData);
  const saveStep4 = useWizardStore((state) => state.saveStep4);
  const setSubmitting = useWizardStore((state) => state.setSubmitting);
  const submitComplete = useWizardStore((state) => state.submitComplete);
  const getFormPayload = useWizardStore((state) => state.getFormPayload);

  const countryCodeOptions = [
    { value: '+61', label: '+61 (Australia)' },
    { value: '+44', label: '+44 (UK)' },
    { value: '+1', label: '+1 (US/Canada)' },
    { value: '+91', label: '+91 (India)' },
    { value: '+852', label: '+852 (Hong Kong)' },
    { value: '+353', label: '+353 (Ireland)' },
    { value: '+60', label: '+60 (Malaysia)' },
    { value: '+64', label: '+64 (New Zealand)' },
    { value: '+65', label: '+65 (Singapore)' },
  ];

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

  const studyDestinationOptions = [
    'Australia', 'Canada', 'Hong Kong', 'Ireland',
    'Malaysia', 'New Zealand', 'Singapore', 'United Kingdom',
    'United States',
  ];

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step4Schema),
    defaultValues: {
      contactPreference: step4Data.contactPreference,
      fullName: step4Data.fullName,
      emailAddress: step4Data.emailAddress,
      countryCode: step4Data.countryCode,
      phoneNumber: step4Data.phoneNumber,
      currentCountry: step4Data.currentCountry,
      studyDestinations: step4Data.studyDestinations,
    },
  });

  const contactPreference = watch('contactPreference');

  const onSubmit = async (data) => {
    // Save step 4 data to Zustand
    saveStep4(data);

    // Submit to API
    try {
      setSubmitting(true);
      const payload = getFormPayload();
      const response = await submitComplaint(payload);
      submitComplete(response.complaintId);
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitting(false);
      // TODO: Display error notification to user
    }
  };

  return (
    <form id="step4-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h2 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333]">
        Would you like us to contact you about your Complaint?
      </h2>

      {/* Yes / No Radio */}
      <div className="mt-4 space-y-4">
        {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map((option) => (
          <label key={option.value} className="flex items-start cursor-pointer">
            <div className="flex items-center h-6">
              <input
                type="radio"
                value={option.value}
                {...register('contactPreference')}
                className="w-[16px] h-[16px] text-blue-600 border-gray-400 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="ml-3 text-[#333333] font-normal text-[15px] leading-[24px] tracking-normal">
              {option.label}
            </div>
          </label>
        ))}
      </div>
      {errors.contactPreference && (
        <p className="mt-2 text-[13px] text-red-500">{errors.contactPreference.message}</p>
      )}

      {/* Contact Details (Yes flow) */}
      {contactPreference === 'yes' && (
        <div className="mt-6 w-full max-w-[820px] p-[20px] bg-[#F4F6FB] border border-[#DDE3F0] rounded-[10px] flex flex-col gap-[16px]">
          <p className="text-[16px] font-normal leading-[24px] tracking-normal text-[#333333]">
            So we can get in touch with you, please complete the following.
          </p>

          {/* Name */}
          <div>
            <label className="block text-[#333333] font-medium text-[14px] leading-[21px] tracking-normal mb-1">
              Name
            </label>
            <input
              type="text"
              {...register('fullName')}
              placeholder="Full name"
              className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] placeholder:text-[#9AA1AB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none focus:border-[#5C656E] ${
                errors.fullName ? 'border-red-500' : 'border-[#5C656E]'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-[13px] text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#333333] font-medium text-[14px] leading-[21px] tracking-normal mb-1">
              Best email address
            </label>
            <input
              type="email"
              {...register('emailAddress')}
              placeholder="you@example.com"
              className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] placeholder:text-[#9AA1AB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none focus:border-[#5C656E] ${
                errors.emailAddress ? 'border-red-500' : 'border-[#5C656E]'
              }`}
            />
            {errors.emailAddress && (
              <p className="mt-1 text-[13px] text-red-500">{errors.emailAddress.message}</p>
            )}
          </div>

          {/* Phone: Country Code + Number */}
          <div className="flex gap-4">
            <div className="w-[180px]">
              <label className="block text-[#333333] font-medium text-[14px] leading-[21px] tracking-normal mb-1">
                Country code
              </label>
              <div className="relative">
                <select
                  {...register('countryCode')}
                  className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none appearance-none focus:border-[#5C656E] ${
                    errors.countryCode ? 'border-red-500' : 'border-[#5C656E]'
                  }`}
                >
                  <option value="">Select</option>
                  {countryCodeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5C656E]">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              {errors.countryCode && (
                <p className="mt-1 text-[13px] text-red-500">{errors.countryCode.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-[#333333] font-medium text-[14px] leading-[21px] tracking-normal mb-1">
                Best contact phone number
              </label>
              <input
                type="text"
                {...register('phoneNumber')}
                placeholder="Phone number"
                className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] placeholder:text-[#9AA1AB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none focus:border-[#5C656E] ${
                  errors.phoneNumber ? 'border-red-500' : 'border-[#5C656E]'
                }`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-[13px] text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          {/* Current Country */}
          <div>
            <h3 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333] mb-2">
              Where are you currently located?
            </h3>
            <label className="block text-[#333333] font-medium text-[14px] leading-[21px] tracking-normal mb-1">
              Country
            </label>
            <div className="relative">
              <select
                {...register('currentCountry')}
                className={`w-full h-[41px] px-[12px] py-[10px] border rounded-[4px] bg-white text-[14px] leading-[21px] font-normal text-[#333333] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none appearance-none focus:border-[#5C656E] ${
                  errors.currentCountry ? 'border-red-500' : 'border-[#5C656E]'
                }`}
              >
                <option value="">Select country</option>
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
            {errors.currentCountry && (
              <p className="mt-1 text-[13px] text-red-500">{errors.currentCountry.message}</p>
            )}
          </div>

          {/* Study Destinations */}
          <div>
            <h3 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333] mb-3">
              Where are you hoping to study in the future?
            </h3>
            <Controller
              name="studyDestinations"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {studyDestinationOptions.map((destination) => (
                    <label key={destination} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value?.includes(destination) || false}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...(field.value || []), destination]
                            : (field.value || []).filter(d => d !== destination);
                          field.onChange(updated);
                        }}
                        className="h-[16px] w-[16px] text-blue-600 border-gray-400 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none"
                      />
                      <span className="ml-3 text-[#333333] font-normal text-[15px] leading-[24px] tracking-normal">
                        {destination}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      )}

    </form>
  );
};

export default Step4_ContactPreference;

import React from 'react';
import useWizardStore from '../../store/wizardStore';
import RadioGroup from '../form/RadioGroup';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';
import Checkbox from '../form/Checkbox';

const Step4_ContactPreference = () => {
  const contactPreference = useWizardStore((state) => state.contactPreference);
  const fullName = useWizardStore((state) => state.fullName);
  const emailAddress = useWizardStore((state) => state.emailAddress);
  const countryCode = useWizardStore((state) => state.countryCode);
  const phoneNumber = useWizardStore((state) => state.phoneNumber);
  const currentCountry = useWizardStore((state) => state.currentCountry);
  const studyDestinations = useWizardStore((state) => state.studyDestinations);
  const privacyPolicyAccepted = useWizardStore((state) => state.privacyPolicyAccepted);

  const setContactPreference = useWizardStore((state) => state.setContactPreference);
  const setFullName = useWizardStore((state) => state.setFullName);
  const setEmailAddress = useWizardStore((state) => state.setEmailAddress);
  const setCountryCode = useWizardStore((state) => state.setCountryCode);
  const setPhoneNumber = useWizardStore((state) => state.setPhoneNumber);
  const setCurrentCountry = useWizardStore((state) => state.setCurrentCountry);
  const toggleStudyDestination = useWizardStore((state) => state.toggleStudyDestination);
  const setPrivacyPolicyAccepted = useWizardStore((state) => state.setPrivacyPolicyAccepted);

  const preferenceOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const countryCodeOptions = [
    { value: '+61', label: '+61 (Australia)' },
    { value: '+44', label: '+44 (UK)' },
    { value: '+1', label: '+1 (US/Canada)' },
    { value: '+91', label: '+91 (India)' },
    { value: '+852', label: '+852 (Hong Kong)' },
    { value: '+353', label: '+353 (Ireland)' },
    { value: '+60', label: '+60 (Malaysia)' },
    { value: '+64', label: '+64 (New Zealand)' },
    { value: '+65', label: '+65 (Singapore)' }
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
    { value: 'SG', label: 'Singapore' }
  ];

  const studyDestinationOptions = [
    'Australia', 'Canada', 'Hong Kong', 'Ireland',
    'Malaysia', 'New Zealand', 'Singapore', 'United Kingdom',
    'United States'
  ];

  return (
    <div className="w-full">
      <h2 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333]">Would you like us to contact you about your Complaint?</h2>
      
      <div className="mt-4">
        <RadioGroup 
          name="contactPreference"
          options={preferenceOptions}
          selectedValue={contactPreference}
          onChange={(e) => setContactPreference(e.target.value)}
        />
      </div>

      {contactPreference === 'yes' && (
        <div className="mt-6 w-full max-w-[820px] p-[20px] bg-[#F4F6FB] border border-[#DDE3F0] rounded-[10px] flex flex-col gap-[16px]">
          <p className="text-[16px] font-normal leading-[24px] tracking-normal text-[#333333]">
            So we can get in touch with you, please complete the following.
          </p>
          
          <TextInput 
            label="Name"
            placeholder="Full name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <TextInput 
            label="Best email address"
            placeholder="you@example.com"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />

          <div className="flex gap-4">
            <div className="w-[180px]">
              <Dropdown 
                label="Country code"
                placeholder="+91"
                options={countryCodeOptions}
                name="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <TextInput 
                label="Best contact phone number"
                placeholder="Phone number"
                name="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <h3 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333]">Where are you currently located?</h3>
          <Dropdown 
            label="Country"
            placeholder="Select country"
            options={countryOptions}
            name="currentCountry"
            value={currentCountry}
            onChange={(e) => setCurrentCountry(e.target.value)}
          />

          <h3 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333]">Where are you hoping to study in the future?</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {studyDestinationOptions.map((destination) => (
              <Checkbox
                key={destination}
                label={destination}
                name={`study_${destination}`}
                checked={studyDestinations.includes(destination)}
                onChange={() => toggleStudyDestination(destination)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Privacy Policy - always shown */}
      {contactPreference && (
        <div className="mt-6">
          <Checkbox
            label="I accept the Privacy Policy"
            name="privacyPolicy"
            checked={privacyPolicyAccepted}
            onChange={() => setPrivacyPolicyAccepted(!privacyPolicyAccepted)}
          />
        </div>
      )}
    </div>
  );
};

export default Step4_ContactPreference;

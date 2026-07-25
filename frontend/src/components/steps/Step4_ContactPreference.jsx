import React, { useState } from 'react';
import RadioGroup from '../form/RadioGroup';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';
import Checkbox from '../form/Checkbox';

const Step4_ContactPreference = () => {
  const [contactPreference, setContactPreference] = useState('');
  const [studyDestinations, setStudyDestinations] = useState([]);

  const preferenceOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const countryCodeOptions = [
    { value: '+61', label: '+61' },
    { value: '+44', label: '+44' },
    { value: '+1', label: '+1' },
    { value: '+91', label: '+91' }
  ];

  const countryOptions = [
    { value: 'AU', label: 'Australia' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'IN', label: 'India' }
  ];

  const studyDestinationOptions = [
    'Australia', 'Canada', 'Hong Kong', 'Ireland',
    'Malaysia', 'New Zealand', 'Singapore', 'United Kingdom',
    'United States'
  ];

  const handleStudyDestinationChange = (destination) => {
    setStudyDestinations(prev => 
      prev.includes(destination) 
        ? prev.filter(d => d !== destination)
        : [...prev, destination]
    );
  };

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
          <p className="text-[16px] font-normal leading-[24px] tracking-normal text-[#333333] mb-6">
            So we can get in touch with you, please complete the following.
          </p>
          
          <TextInput 
            label="Name"
            placeholder="Full name"
            name="fullName"
          />

          <TextInput 
            label="Best email address"
            placeholder="you@example.com"
            name="email"
          />

          <div className="flex gap-4 mb-6">
            <div className="w-[180px]">
              <Dropdown 
                label="Country code"
                placeholder="+91"
                options={countryCodeOptions}
                name="countryCode"
              />
            </div>
            <div className="flex-1">
              <TextInput 
                label="Best contact phone number"
                placeholder="Phone number"
                name="phone"
              />
            </div>
          </div>

          <h3 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333] mb-4">Where are you currently located?</h3>
          <Dropdown 
            label="Country"
            placeholder="Select country"
            options={countryOptions}
            name="currentCountry"
          />

          <h3 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333] mt-6 mb-4">Where are you hoping to study in the future?</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {studyDestinationOptions.map((destination) => (
              <Checkbox
                key={destination}
                label={destination}
                name={`study_${destination}`}
                checked={studyDestinations.includes(destination)}
                onChange={() => handleStudyDestinationChange(destination)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4_ContactPreference;

import React, { useState } from 'react';
import RadioGroup from '../form/RadioGroup';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';

const Step4_ContactPreference = () => {
  const [contactPreference, setContactPreference] = useState('');

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

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Would you like us to contact you about your Complaint?</h2>
      
      <RadioGroup 
        name="contactPreference"
        options={preferenceOptions}
        selectedValue={contactPreference}
        onChange={(e) => setContactPreference(e.target.value)}
      />

      {contactPreference === 'yes' && (
        <div className="mt-6 p-6 bg-slate-50 border border-gray-200 rounded-lg">
          <p className="text-gray-700 mb-6">So we can get in touch with you, please complete the following.</p>
          
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

          <div className="flex space-x-4 mb-2">
            <div className="w-1/3">
              <Dropdown 
                label="Country code"
                placeholder="+91"
                options={countryCodeOptions}
                name="countryCode"
              />
            </div>
            <div className="w-2/3">
              <TextInput 
                label="Best contact phone number"
                placeholder="Phone number"
                name="phone"
              />
            </div>
          </div>

          <h3 className="text-gray-800 font-bold mb-3">Where are you currently located?</h3>
          <Dropdown 
            label="Country"
            placeholder="Select country"
            options={countryOptions}
            name="currentCountry"
          />
        </div>
      )}
    </div>
  );
};

export default Step4_ContactPreference;

import React, { useState } from 'react';
import Dropdown from '../form/Dropdown';
import TextInput from '../form/TextInput';
import Checkbox from '../form/Checkbox';

const Step2_IncidentLocation = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isOther, setIsOther] = useState(false);

  // Mock options until API is ready
  const countryOptions = [
    { value: 'AU', label: 'Australia' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'IN', label: 'India' }
  ];

  return (
    <div className="w-full">
      <h2 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333]">Where did this happen?</h2>
      
      <Dropdown 
        label="Country"
        placeholder="Select country"
        options={countryOptions}
        name="country"
      />

      <TextInput 
        label="Office"
        placeholder="Type office"
        name="office"
      />

      <div className="mt-6 mb-2">
        <span className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal mb-3">Other</span>
        <Checkbox 
          label="Online"
          name="isOnline"
          checked={isOnline}
          onChange={(e) => setIsOnline(e.target.checked)}
        />
        
        <Checkbox 
          label="Other - Please Specify"
          name="isOther"
          checked={isOther}
          onChange={(e) => setIsOther(e.target.checked)}
        />
      </div>

      {isOther && (
        <div className="ml-8 mt-2">
          <TextInput 
            placeholder="Please specify"
            name="otherSpecification"
          />
        </div>
      )}
    </div>
  );
};

export default Step2_IncidentLocation;

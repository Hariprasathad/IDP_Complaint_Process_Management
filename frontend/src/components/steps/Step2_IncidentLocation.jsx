import React from 'react';
import useWizardStore from '../../store/wizardStore';
import Dropdown from '../form/Dropdown';
import TextInput from '../form/TextInput';
import Checkbox from '../form/Checkbox';

const Step2_IncidentLocation = () => {
  const country = useWizardStore((state) => state.country);
  const office = useWizardStore((state) => state.office);
  const isOnline = useWizardStore((state) => state.isOnline);
  const isOther = useWizardStore((state) => state.isOther);
  const onlineSpecify = useWizardStore((state) => state.onlineSpecify);
  const setCountry = useWizardStore((state) => state.setCountry);
  const setOffice = useWizardStore((state) => state.setOffice);
  const setIsOnline = useWizardStore((state) => state.setIsOnline);
  const setIsOther = useWizardStore((state) => state.setIsOther);
  const setOnlineSpecify = useWizardStore((state) => state.setOnlineSpecify);

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
      
      <div className="mt-4">
        <Dropdown 
          label="Country"
          placeholder="Select country"
          options={countryOptions}
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <TextInput 
          label="Office"
          placeholder="Type office"
          name="office"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
        />

        <div className="mt-6 mb-2">
          <span className="block text-[#333333] font-semibold text-[16px] leading-[24px] tracking-normal mb-3">Other</span>
          <Checkbox 
            label="Online"
            name="isOnline"
            checked={isOnline}
            onChange={() => setIsOnline(!isOnline)}
          />
          
          <Checkbox 
            label="Other - Please Specify"
            name="isOther"
            checked={isOther}
            onChange={() => setIsOther(!isOther)}
          />
        </div>

        {(isOnline || isOther) && (
          <div className="ml-7 mt-2">
            <TextInput 
              placeholder="Please specify"
              name="onlineSpecify"
              value={onlineSpecify}
              onChange={(e) => setOnlineSpecify(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2_IncidentLocation;

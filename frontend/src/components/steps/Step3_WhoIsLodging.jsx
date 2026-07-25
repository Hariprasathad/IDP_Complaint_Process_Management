import React from 'react';
import useWizardStore from '../../store/wizardStore';
import RadioGroup from '../form/RadioGroup';
import TextInput from '../form/TextInput';

const Step3_WhoIsLodging = () => {
  const complainantType = useWizardStore((state) => state.complainantType);
  const complainantTypeOther = useWizardStore((state) => state.complainantTypeOther);
  const setComplainantType = useWizardStore((state) => state.setComplainantType);
  const setComplainantTypeOther = useWizardStore((state) => state.setComplainantTypeOther);

  const options = [
    { value: 'student', label: 'I am a Student' },
    { value: 'parent', label: 'I am a Parent of a Student' },
    { value: 'university_member', label: 'I am a member of a University, College or School, sharing on behalf of a Student or Parent' },
    { value: 'other', label: 'Other - Please Specify' }
  ];

  return (
    <div className="w-full">
      <h2 className="text-[16px] font-semibold leading-[24px] tracking-normal text-[#333333]">Which of the following best describes you?</h2>
      
      <div className="mt-4">
        <RadioGroup 
          name="role"
          options={options}
          selectedValue={complainantType}
          onChange={(e) => setComplainantType(e.target.value)}
        />
      </div>

      {complainantType === 'other' && (
        <div className="ml-7 mt-2">
          <TextInput 
            placeholder="Please specify"
            name="complainantTypeOther"
            value={complainantTypeOther}
            onChange={(e) => setComplainantTypeOther(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Step3_WhoIsLodging;

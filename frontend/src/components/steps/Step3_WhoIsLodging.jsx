import React, { useState } from 'react';
import RadioGroup from '../form/RadioGroup';
import TextInput from '../form/TextInput';

const Step3_WhoIsLodging = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const options = [
    { value: 'partner', label: 'I am a member of a University, College or School and an IDP Partner' },
    { value: 'non_partner', label: 'I am a member of a University, College or School, but not an IDP Partner' },
    { value: 'employee', label: 'I am an IDP employee raising on behalf of a University, College or School and an IDP Partner' },
    { value: 'other', label: 'Other - Please Specify' }
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Which of the following best describes you?</h2>
      
      <RadioGroup 
        name="role"
        options={options}
        selectedValue={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      />

      {selectedRole === 'other' && (
        <div className="ml-8 mt-2">
          <TextInput 
            placeholder="Please specify"
            name="otherRoleSpecification"
          />
        </div>
      )}
    </div>
  );
};

export default Step3_WhoIsLodging;

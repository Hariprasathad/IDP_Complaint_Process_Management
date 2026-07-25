import React from 'react';
import useWizardStore from '../../store/wizardStore';
import TextArea from '../form/TextArea';
import FileUploader from '../form/FileUploader';

const Step1_ComplaintDetails = () => {
  const description = useWizardStore((state) => state.description);
  const setDescription = useWizardStore((state) => state.setDescription);

  return (
    <div className="w-full">
      <TextArea 
        label="Can you please describe what's happened?"
        description="We'd appreciate as much information and detail as possible&#10;e.g. what's happened, where and what expectations did you have, etc?"
        placeholder="Start typing your complaint here..."
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FileUploader 
        label="Can you share any supporting information and documentation?"
      />
    </div>
  );
};

export default Step1_ComplaintDetails;

import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { step1Schema } from '../../validation/schemas.js';
import useWizardStore from '../../store/wizardStore.js';
import TextArea from '../form/TextArea.jsx';
import FileUploader from '../form/FileUploader.jsx';

const Step1_ComplaintDetails = forwardRef(function Step1_ComplaintDetails(_, ref) {
  const { step1, setStepData, goNext } = useWizardStore();
  const [attachments, setAttachments] = useState(step1.attachments || []);

  const {
    register,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step1Schema),
    defaultValues: { description: step1.description },
    mode: 'onBlur',
  });

  useImperativeHandle(ref, () => ({
    triggerNext: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        setStepData('step1', { ...values, attachments });
        goNext();
      }
    },
  }));

  function handleUpload(file) {
    const newFile = {
      id: `${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      file,
    };
    setAttachments((prev) => [...prev, newFile]);
  }

  function handleRemove(fileId) {
    setAttachments((prev) => prev.filter((f) => f.id !== fileId));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Tell us about your complaint</h2>
        <p className="text-sm text-gray-600">
          Please describe your complaint in detail. Your information is handled in accordance with our{' '}
          <a href="https://www.idp.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://www.idp.com/terms" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
            Terms of Use
          </a>.
        </p>
      </div>

      <TextArea
        label="Describe your complaint"
        name="description"
        required
        register={register('description')}
        error={errors.description}
        maxLength={10000}
        placeholder="Please provide as much detail as possible..."
        watch={watch}
      />

      <div>
        <p className="text-sm font-semibold text-gray-900 mb-2">Supporting Documents (optional)</p>
        <FileUploader
          files={attachments}
          onUpload={handleUpload}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
});

export default Step1_ComplaintDetails;

import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { step3Schema } from '../../validation/schemas.js';
import useWizardStore from '../../store/wizardStore.js';
import RadioGroup from '../form/RadioGroup.jsx';
import TextInput from '../form/TextInput.jsx';

const PERSON_OPTIONS = [
  { value: 'student', label: 'Student' },
  { value: 'parent', label: 'Parent' },
  { value: 'representative', label: 'University/College/School Representative' },
  { value: 'other', label: 'Other' },
];

const Step3_WhoIsLodging = forwardRef(function Step3_WhoIsLodging(_, ref) {
  const { step3, setStepData, goNext } = useWizardStore();

  const {
    register,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      personType: step3.personType,
      otherSpecify: step3.otherSpecify,
    },
    mode: 'onBlur',
  });

  const personType = watch('personType');

  useImperativeHandle(ref, () => ({
    triggerNext: async () => {
      const valid = await trigger();
      if (valid) {
        setStepData('step3', getValues());
        goNext();
      }
    },
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Who is lodging this complaint?</h2>
        <p className="text-sm text-gray-600">Please tell us your role.</p>
      </div>

      <RadioGroup
        label="I am a"
        name="personType"
        required
        register={register('personType')}
        error={errors.personType}
        options={PERSON_OPTIONS}
      />

      {personType === 'other' && (
        <TextInput
          label="Please Specify"
          name="otherSpecify"
          required
          register={register('otherSpecify')}
          error={errors.otherSpecify}
          placeholder="Please specify your role"
        />
      )}
    </div>
  );
});

export default Step3_WhoIsLodging;

import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { step2Schema } from '../../validation/schemas.js';
import useWizardStore from '../../store/wizardStore.js';
import { useCountries } from '../../hooks/useCountries.js';
import Dropdown from '../form/Dropdown.jsx';
import TextInput from '../form/TextInput.jsx';

const Step2_IncidentLocation = forwardRef(function Step2_IncidentLocation(_, ref) {
  const { step2, setStepData, goNext } = useWizardStore();
  const { countries, loading } = useCountries();

  const {
    register,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step2Schema),
    defaultValues: {
      country: step2.country,
      office: step2.office,
      otherSpecify: step2.otherSpecify,
    },
    mode: 'onBlur',
  });

  const selectedCountry = watch('country');

  useImperativeHandle(ref, () => ({
    triggerNext: async () => {
      const valid = await trigger();
      if (valid) {
        setStepData('step2', getValues());
        goNext();
      }
    },
  }));

  const countryOptions = countries.map((c) => ({ value: c.code, label: c.name }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Where did this happen?</h2>
        <p className="text-sm text-gray-600">Tell us where the incident occurred.</p>
      </div>

      <Dropdown
        label="Country"
        name="country"
        required
        register={register('country')}
        error={errors.country}
        options={countryOptions}
        placeholder={loading ? 'Loading countries...' : 'Select a country'}
      />

      {selectedCountry && selectedCountry !== 'ONLINE' && (
        <TextInput
          label="Office"
          name="office"
          required
          register={register('office')}
          error={errors.office}
          placeholder="Enter the office name"
          maxLength={150}
        />
      )}

      {selectedCountry === 'ONLINE' && (
        <TextInput
          label="Other, Please Specify"
          name="otherSpecify"
          required
          register={register('otherSpecify')}
          error={errors.otherSpecify}
          placeholder="Please specify"
        />
      )}
    </div>
  );
});

export default Step2_IncidentLocation;

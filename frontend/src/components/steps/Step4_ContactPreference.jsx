import { forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { step4Schema } from '../../validation/schemas.js';
import useWizardStore from '../../store/wizardStore.js';
import { useCountries } from '../../hooks/useCountries.js';
import { submitComplaint } from '../../services/api.js';
import RadioGroup from '../form/RadioGroup.jsx';
import TextInput from '../form/TextInput.jsx';
import PhoneInput from '../form/PhoneInput.jsx';
import Dropdown from '../form/Dropdown.jsx';
import MultiSelect from '../form/MultiSelect.jsx';
import Checkbox from '../form/Checkbox.jsx';
import InlineError from '../form/InlineError.jsx';

const CONTACT_OPTIONS = [
  { value: 'yes', label: 'Yes, I would like to be contacted' },
  { value: 'no', label: 'No, I do not want to be contacted' },
];

const STUDY_DESTINATIONS = [
  { value: 'AU', label: 'Australia' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'IE', label: 'Ireland' },
];

const Step4_ContactPreference = forwardRef(function Step4_ContactPreference(_, ref) {
  const { step4, setStepData, setSubmitting, setError, setComplaintId, setConfirmed, step1, step2, step3, submissionError } = useWizardStore();
  const { countries } = useCountries();

  const {
    register,
    trigger,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step4Schema),
    defaultValues: {
      contactPreference: step4.contactPreference,
      fullName: step4.fullName,
      email: step4.email,
      countryCode: step4.countryCode,
      phone: step4.phone,
      currentCountry: step4.currentCountry,
      studyDestinations: step4.studyDestinations,
      privacyAccepted: step4.privacyAccepted,
    },
    mode: 'onBlur',
  });

  const contactPreference = watch('contactPreference');
  const privacyAccepted = watch('privacyAccepted');

  useImperativeHandle(ref, () => ({
    triggerSubmit: async () => {
      const valid = await trigger();
      if (!valid) return;

      const values = getValues();
      setStepData('step4', values);
      setSubmitting(true);
      setError(null);

      try {
        const payload = {
          description: step1.description,
          attachments: step1.attachments.map((f) => ({ name: f.name, size: f.size })),
          country: step2.country,
          office: step2.office,
          otherSpecify: step2.otherSpecify,
          personType: step3.personType,
          personTypeOther: step3.otherSpecify,
          contactPreference: values.contactPreference,
          ...(values.contactPreference === 'yes' && {
            fullName: values.fullName,
            email: values.email,
            countryCode: values.countryCode,
            phone: values.phone,
            currentCountry: values.currentCountry,
            studyDestinations: values.studyDestinations,
          }),
        };

        const result = await submitComplaint(payload);
        setComplaintId(result.complaintId || result.id || 'CPM-' + Date.now());
        setConfirmed();
      } catch (err) {
        setError(err.message || 'Submission failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  }));

  const countryOptions = countries
    .filter((c) => c.code !== 'ONLINE')
    .map((c) => ({ value: c.code, label: c.name }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Preference</h2>
        <p className="text-sm text-gray-600">Would you like us to contact you about this complaint?</p>
      </div>

      <RadioGroup
        label="Would you like to be contacted?"
        name="contactPreference"
        required
        register={register('contactPreference')}
        error={errors.contactPreference}
        options={CONTACT_OPTIONS}
      />

      {contactPreference === 'yes' && (
        <div className="bg-grey-bg rounded-xl p-6 space-y-4">
          <TextInput
            label="Full Name"
            name="fullName"
            required
            register={register('fullName')}
            error={errors.fullName}
            placeholder="Enter your full name"
            maxLength={200}
          />

          <TextInput
            label="Email Address"
            name="email"
            required
            type="email"
            register={register('email')}
            error={errors.email}
            placeholder="Enter your email address"
          />

          <PhoneInput
            codeRegister={register('countryCode')}
            phoneRegister={register('phone')}
            codeError={errors.countryCode}
            phoneError={errors.phone}
            countries={countries}
            codeName="countryCode"
            phoneName="phone"
          />

          <Dropdown
            label="Current Country of Residence"
            name="currentCountry"
            required
            register={register('currentCountry')}
            error={errors.currentCountry}
            options={countryOptions}
            placeholder="Select your country"
          />

          <Controller
            name="studyDestinations"
            control={control}
            render={({ field }) => (
              <MultiSelect
                label="Study Destination(s)"
                name="studyDestinations"
                required
                options={STUDY_DESTINATIONS}
                value={field.value || []}
                onChange={field.onChange}
                error={errors.studyDestinations}
              />
            )}
          />
        </div>
      )}

      <div className="pt-2">
        <Checkbox
          label={
            <>
              I have read and accept the{' '}
              <a href="https://www.idp.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://www.idp.com/terms" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
                Terms of Use
              </a>
            </>
          }
          name="privacyAccepted"
          register={register('privacyAccepted')}
          error={errors.privacyAccepted}
        />
      </div>

      {submissionError && (
        <InlineError message={submissionError} />
      )}
    </div>
  );
});

export default Step4_ContactPreference;

import * as yup from 'yup';

export const step4Schema = yup.object().shape({
  contactPreference: yup
    .string()
    .required('Please answer this question'),
  fullName: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema
        .required('Enter a valid name')
        .test(
          'not-only-spaces',
          'Enter a valid name',
          (value) => value && value.trim().length > 0
        )
        .matches(/^[a-zA-Z\s]+$/, 'Enter a valid name')
        .max(200, 'Enter a valid name'),
      otherwise: (schema) => schema.notRequired(),
    }),
  emailAddress: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema
        .required('Enter a valid email address')
        .email('Enter a valid email address'),
      otherwise: (schema) => schema.notRequired(),
    }),
  countryCode: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema.required('Enter a valid mobile number'),
      otherwise: (schema) => schema.notRequired(),
    }),
  phoneNumber: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema
        .required('Enter a valid mobile number')
        .matches(/^[\d\s\-()]+$/, 'Enter a valid mobile number')
        .test('min-digits', 'Enter a valid mobile number', (value) => {
          if (!value) return false;
          const digitsOnly = value.replace(/\D/g, '');
          return digitsOnly.length >= 7 && digitsOnly.length <= 15;
        }),
      otherwise: (schema) => schema.notRequired(),
    }),
  currentCountry: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema.required('Please answer this question'),
      otherwise: (schema) => schema.notRequired(),
    }),
  studyDestinations: yup
    .array()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema.of(yup.string()).min(1, 'Please answer this question'),
      otherwise: (schema) => schema.of(yup.string()),
    }),
  privacyPolicyAccepted: yup
    .boolean()
    .oneOf([true], 'Please accept the Privacy Policy to continue')
    .required('Please accept the Privacy Policy to continue'),
});

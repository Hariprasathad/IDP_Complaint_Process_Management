import * as yup from 'yup';

export const step4Schema = yup.object().shape({
  contactPreference: yup
    .string()
    .required('Please select whether you would like us to contact you.'),
  fullName: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema
        .required('Please enter your full name.')
        .test(
          'not-only-spaces',
          'Full name must not contain only spaces.',
          (value) => value && value.trim().length > 0
        )
        .max(100, 'Full name must not exceed 100 characters.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  emailAddress: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema
        .required('Please enter your email address.')
        .email('Please enter a valid email address.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  countryCode: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema.required('Please select your country code.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  phoneNumber: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema
        .required('Please enter your phone number.')
        .matches(/^\d+$/, 'Phone number must contain numeric values only.')
        .min(7, 'Please enter a valid phone number.')
        .max(15, 'Please enter a valid phone number.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  currentCountry: yup
    .string()
    .when('contactPreference', {
      is: 'yes',
      then: (schema) => schema.required('Please select your current country.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  studyDestinations: yup.array().of(yup.string()),
});

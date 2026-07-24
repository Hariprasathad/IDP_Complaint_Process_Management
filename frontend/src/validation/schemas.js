import * as yup from 'yup';
import { MESSAGES } from './messages.js';

export const step1Schema = yup.object({
  description: yup.string()
    .trim()
    .required(MESSAGES.required)
    .max(10000, MESSAGES.maxChars(10000)),
});

export const step2Schema = yup.object({
  country: yup.string().required(MESSAGES.required),
  office: yup.string().when('country', {
    is: (val) => val && val !== 'ONLINE',
    then: (schema) => schema.required(MESSAGES.required).max(150, MESSAGES.maxChars(150)),
    otherwise: (schema) => schema.notRequired(),
  }),
  otherSpecify: yup.string().when('country', {
    is: 'ONLINE',
    then: (schema) => schema.trim().required(MESSAGES.required),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const step3Schema = yup.object({
  personType: yup.string()
    .oneOf(['student', 'parent', 'representative', 'other'], MESSAGES.required)
    .required(MESSAGES.required),
  otherSpecify: yup.string().when('personType', {
    is: 'other',
    then: (schema) => schema.trim().required(MESSAGES.required),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const step4Schema = yup.object({
  contactPreference: yup.string()
    .oneOf(['yes', 'no'], MESSAGES.required)
    .required(MESSAGES.required),
  fullName: yup.string().when('contactPreference', {
    is: 'yes',
    then: (schema) => schema.trim().required(MESSAGES.invalidName).matches(/^[a-zA-Z\s]+$/, MESSAGES.invalidName).max(200),
    otherwise: (schema) => schema.notRequired(),
  }),
  email: yup.string().when('contactPreference', {
    is: 'yes',
    then: (schema) => schema.required(MESSAGES.invalidEmail).email(MESSAGES.invalidEmail),
    otherwise: (schema) => schema.notRequired(),
  }),
  countryCode: yup.string().when('contactPreference', {
    is: 'yes',
    then: (schema) => schema.required(MESSAGES.required),
    otherwise: (schema) => schema.notRequired(),
  }),
  phone: yup.string().when('contactPreference', {
    is: 'yes',
    then: (schema) => schema
      .required(MESSAGES.invalidPhone)
      .matches(/^[\d\s\-()]+$/, MESSAGES.invalidPhone)
      .test('min-digits', MESSAGES.invalidPhone, (value) => {
        if (!value) return false;
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length >= 7 && digitsOnly.length <= 15;
      }),
    otherwise: (schema) => schema.notRequired(),
  }),
  currentCountry: yup.string().when('contactPreference', {
    is: 'yes',
    then: (schema) => schema.required(MESSAGES.required),
    otherwise: (schema) => schema.notRequired(),
  }),
  studyDestinations: yup.array().when('contactPreference', {
    is: 'yes',
    then: (schema) => schema.of(yup.string()).min(1, MESSAGES.required),
    otherwise: (schema) => schema.notRequired(),
  }),
  privacyAccepted: yup.boolean().oneOf([true], MESSAGES.required).required(MESSAGES.required),
});

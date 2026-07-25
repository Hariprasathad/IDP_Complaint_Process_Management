import * as yup from 'yup';

const MAX_DESCRIPTION_LENGTH = 5000;

export const step1Schema = yup.object().shape({
  description: yup
    .string()
    .required('Please describe what has happened. This field is required.')
    .test(
      'not-only-spaces',
      'Description must not contain only spaces.',
      (value) => value && value.trim().length > 0
    )
    .max(MAX_DESCRIPTION_LENGTH, `Complaint description must not exceed ${MAX_DESCRIPTION_LENGTH} characters.`),
});

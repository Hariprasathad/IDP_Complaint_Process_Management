import * as yup from 'yup';

export const step3Schema = yup.object().shape({
  complainantType: yup
    .string()
    .required('Please select the option that best describes you.'),
  complainantTypeOther: yup
    .string()
    .when('complainantType', {
      is: 'other',
      then: (schema) => schema
        .required('Please specify your role.')
        .test(
          'not-only-spaces',
          'Please specify your role.',
          (value) => value && value.trim().length > 0
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
});

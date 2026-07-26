import * as yup from 'yup';

export const step3Schema = yup.object().shape({
  complainantType: yup
    .string()
    .required('Please answer this question'),
  complainantTypeOther: yup
    .string()
    .when('complainantType', {
      is: 'other',
      then: (schema) => schema
        .required('Please answer this question')
        .test(
          'not-only-spaces',
          'Please answer this question',
          (value) => value && value.trim().length > 0
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
});

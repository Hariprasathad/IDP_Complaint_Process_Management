import * as yup from 'yup';

export const step2Schema = yup.object().shape({
  country: yup
    .string()
    .required('Please answer this question'),
  office: yup
    .string()
    .when(['isOnline'], {
      is: false,
      then: (schema) => schema
        .required('Please answer this question')
        .matches(/^[a-zA-Z\s]*$/, 'Alphabets only'),
      otherwise: (schema) => schema.notRequired(),
    }),
  isOnline: yup.boolean(),
  isOther: yup.boolean(),
  onlineSpecify: yup
    .string()
    .when(['isOnline', 'isOther'], {
      is: (isOnline, isOther) => isOnline || isOther,
      then: (schema) => schema.required('Please answer this question'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

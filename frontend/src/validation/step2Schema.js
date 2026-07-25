import * as yup from 'yup';

export const step2Schema = yup.object().shape({
  country: yup
    .string()
    .required('Please select the country where this happened.'),
  office: yup
    .string()
    .when(['isOnline'], {
      is: false,
      then: (schema) => schema.required('Please select the office where this happened.'),
      otherwise: (schema) => schema.notRequired(),
    }),
  isOnline: yup.boolean(),
  isOther: yup.boolean(),
  onlineSpecify: yup
    .string()
    .when(['isOnline', 'isOther'], {
      is: (isOnline, isOther) => isOnline || isOther,
      then: (schema) => schema.required('Please specify where online this happened.'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

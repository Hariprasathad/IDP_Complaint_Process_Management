import * as yup from 'yup';

export const step2Schema = yup.object().shape({
  country: yup
    .string()
    .required('Please answer this question'),
  office: yup.string().notRequired(),
  isOnline: yup.boolean(),
  isOther: yup.boolean(),
  onlineSpecify: yup
    .string()
    .when('isOther', {
      is: true,
      then: (schema) => schema.required('Please answer this question'),
      otherwise: (schema) => schema.notRequired(),
    }),
}).test(
  'at-least-one-location',
  'Please answer this question',
  (values) => {
    // At least one must be answered: Office filled OR Online checked OR Other checked
    const hasOffice = values.office && values.office.trim().length > 0;
    const hasOnline = values.isOnline === true;
    const hasOther = values.isOther === true;
    return hasOffice || hasOnline || hasOther;
  }
);

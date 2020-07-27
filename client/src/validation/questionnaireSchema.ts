import * as yup from 'yup';

export const questionnaireSchema = yup.object().shape({
  state: yup.string().required('State is required'),
  email: yup.string().required('Email is required'),
  primaryPhoneNumber: yup.string().required('Primary phone number is required'),
  primaryPhoneNumberConfirm: yup
    .string()
    .oneOf(
      [yup.ref('primaryPhoneNumber'), null],
      'Primary phone number must match'
    ),
});

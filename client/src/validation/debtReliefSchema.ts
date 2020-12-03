import * as yup from 'yup';

export const debtReliefSchema = yup.object().shape({
  state: yup.string().required('State is required'),
  email: yup.string().required('Email is required'),
  phoneNumber: yup.string().required('Primary phone number is required'),
  phoneNumberConfirm: yup
    .string()
    .oneOf([yup.ref('phoneNumber'), null], 'Primary phone number must match'),
});

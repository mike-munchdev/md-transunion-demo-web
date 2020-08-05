import * as yup from 'yup';

export const debtReliefLoginSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
});

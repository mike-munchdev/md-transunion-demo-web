import * as yup from 'yup';

export const creditorModalSchema = yup.object().shape({
  id: yup.number().required('Creditor Name is required'),
  accountNumber: yup.string().required('Account Number is required'),
  currentBalance: yup.number().required('Current Balance is required'),
  currentApr: yup.number().required('Current APR is required'),
  currentPayment: yup.number().required('Current Payment is required'),
});

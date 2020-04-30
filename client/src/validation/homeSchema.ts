import * as yup from 'yup';

export const homeSchema = yup.object().shape({
  code: yup.string().required('Code is required'),
  phoneNumber: yup.string().required('Phone number is required'),
});

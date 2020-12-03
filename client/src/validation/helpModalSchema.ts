import * as yup from 'yup';

export const helpModalSchema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  phoneNumber: yup.string().required('Phone Number is required.'),
  email: yup.string().required('Email is required.'),
});

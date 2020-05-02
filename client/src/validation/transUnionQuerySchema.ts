import * as yup from 'yup';

export const transUnionQuerySchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  ssn: yup.string().required('SSN is required'),
});

import * as yup from 'yup';

const fieldRequired = 'Field is required';

export const homeSchema = yup.object().shape({
  code: yup.string().required(fieldRequired),
});

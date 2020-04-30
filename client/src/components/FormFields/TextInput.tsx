import React from 'react';

import {
  FormFieldProps,
  Form,
  Label,
  Input,
  SemanticWIDTHS,
} from 'semantic-ui-react';
import { FieldProps } from 'formik';

interface ITextInputProps {
  fieldProps: FieldProps;
  placeholder?: string;
  width: SemanticWIDTHS;
  label?: string;
}

const TextInput: React.FC<ITextInputProps> = ({
  width,
  placeholder,
  label,
  fieldProps: { form, field },
}) => {
  return (
    <Form.Field
      width={width}
      {...field}
      control={Input}
      type="text"
      placeholder={placeholder}
      label={label}
      error={
        form.touched[field.name] && form.errors[field.name]
          ? {
              content: form.errors[field.name],
              pointing: 'below',
            }
          : null
      }
    ></Form.Field>
  );
};

export default TextInput;

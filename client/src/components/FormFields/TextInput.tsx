import React from 'react';

import { Form, Input, SemanticWIDTHS, Label } from 'semantic-ui-react';
import { FieldProps } from 'formik';

interface ITextInputProps {
  fieldProps: FieldProps;
  placeholder?: string;
  width?: SemanticWIDTHS;
  label?: string;
}

const TextInput: React.FC<ITextInputProps> = ({
  width,
  placeholder,
  label,
  fieldProps: { form, field },
}) => {
  return (
    <Form.Input
      label={label}
      width={width}
      {...field}
      fluid
      type="text"
      placeholder={placeholder}
      error={
        form.touched[field.name] !== undefined &&
        form.errors[field.name] != undefined
      }
    />
  );
};

export default TextInput;

import React from 'react';

import {
  Form,
  Input,
  SemanticWIDTHS,
  Label,
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
    <Form.Input
      width={width}
      {...field}
      
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
    >
      {label && <Label>{label}</Label>}
      <Input placeholder={placeholder} error={form.touched[field.name] != null && form.errors[field.name] != null}></Input>
    </Form.Input>
  );
};

export default TextInput;

import React from 'react';

import { Form, SemanticWIDTHS } from 'semantic-ui-react';
import { FieldProps } from 'formik';

interface ITextInputProps {
  fieldProps: FieldProps;
  placeholder?: string;
  width?: SemanticWIDTHS;
  label?: string;
  iconName?: string;
}

const TextInput: React.FC<ITextInputProps> = ({
  width,
  placeholder,
  label,
  fieldProps: { form, field },
  iconName,
}) => {
  return (
    <Form.Input
      icon={iconName || null}
      iconPosition={iconName ? 'left' : null}
      label={label}
      width={width || null}
      {...field}
      fluid
      type="text"
      placeholder={placeholder}
      error={
        form.touched[field.name] !== undefined &&
        form.errors[field.name] !== undefined
      }
    />
  );
};

export default TextInput;

import React from 'react';

import {
  Form,
  SemanticWIDTHS,
  DropdownItemProps,
  FormSelectProps,
} from 'semantic-ui-react';

interface ISelectInputProps extends FormSelectProps {
  width?: SemanticWIDTHS;
  label?: string;
  options: DropdownItemProps[];
  setValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
}
const SelectInput: React.FC<ISelectInputProps> = (props) => {
  const {
    field,
    form,
    options,
    setValue,
    placeholder,
    width,
    label,
    setTouched,
  } = props;

  return (
    <Form.Select
      fluid
      search
      width={width}
      label={label}
      id={field.name}
      name={field.name}
      onBlur={() => {
        setTouched(field.name, true);
      }}
      onChange={(e, { value }) => {
        setValue(field.name, value);
      }}
      options={options}
      placeholder={placeholder}
      value={field.value}
      error={
        form.touched[field.name] && form.errors[field.name]
          ? {
              content: form.errors[field.name],
              pointing: 'below',
            }
          : null
      }
    />
  );
};

export default SelectInput;

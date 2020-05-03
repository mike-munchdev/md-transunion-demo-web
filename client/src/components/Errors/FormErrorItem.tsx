import React, {  } from 'react';

export interface IFormErrorItemProps {
  error: String;
}

const FormErrorItem: React.FC<IFormErrorItemProps> = ({ error }) => {
  return <div>{error}</div>;
};

export default FormErrorItem;

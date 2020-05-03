import React, { useState, useEffect, Fragment } from 'react';

export interface IFormErrorProps {
  error: String;
}

const FormError: React.FC<IFormErrorProps> = ({ error }) => {
  return <div>{error}</div>;
};

export default FormError;

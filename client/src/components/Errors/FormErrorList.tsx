import React, { Fragment } from 'react';
import { Message } from 'semantic-ui-react';
import FormErrorItem from './FormErrorItem';

export interface IFormErrorListProps {
  errors: any;
  touched: any;
}

const FormErrorList: React.FC<IFormErrorListProps> = ({ errors, touched }) => {
  const areErrorsFound = (errors: any, touched: any) => {
    let errorsFound = false;
    const errorKeys = Object.keys(errors);
    for (var i = 0; i < errorKeys.length; i++) {
      if (errors[errorKeys[i]].length > 0 && touched[errorKeys[i]] === true) {
        errorsFound = true;
        break;
      }
    }
    return errorsFound;
  };
  return (
    <Fragment>
      {Object.keys(errors).length > 0 && (
        <Message error visible={areErrorsFound(errors, touched)}>
          {Object.keys(errors).map((key: string) => {
            return (touched as any)[key] !== undefined ? (
              <FormErrorItem error={(errors as any)[key]} key={key} />
            ) : null;
          })}
        </Message>
      )}
    </Fragment>
  );
};
export default FormErrorList;

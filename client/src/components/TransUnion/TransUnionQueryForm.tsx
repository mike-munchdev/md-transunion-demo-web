import React, { useState } from 'react';
import { Field, FieldProps, Formik } from 'formik';
import { TextInput, SelectInput } from '../FormFields';
import { Form } from 'semantic-ui-react';
import { stateOptions } from '../../utils/lookup';
import { transUnionQuerySchema } from '../../validation/transUnionQuerySchema';
import { ICustomer } from '../../graphql/models/customer';
import { GET_ACCOUNT_INFORMATION_FROM_TRANSUNION } from '../../graphql/queries/accounts';
import { IAccountsData } from '../../graphql/models/account';
import { useLazyQuery } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';
import LoadingComponent from '../Loading/Loading';

export interface ITransUnionQueryFormProps {
  customer: ICustomer;
  updateAccounts: (accounts: IAccountsData) => void;
}
const TransUnionQueryForm: React.FC<ITransUnionQueryFormProps> = ({
  customer,
  updateAccounts,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();
  const [getAccountInformationFromTransUnion] = useLazyQuery(
    GET_ACCOUNT_INFORMATION_FROM_TRANSUNION,
    {
      fetchPolicy: 'network-only',
      onError: (e) => {
        setIsLoading(false);
        console.log(e);
        addToast(
          'An error occurred retrieving customer information. Please try again.',
          { appearance: 'error' }
        );
      },
      onCompleted: ({ getAccountInformationFromTransUnion }) => {
        setIsLoading(false);
        updateAccounts(getAccountInformationFromTransUnion);
      },
    }
  );

  
  if (isLoading) return <LoadingComponent />;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: customer.firstName || '',
        middleInit: customer.middleInit || '',
        lastName: customer.lastName || '',
        suffix: customer.suffix || '',
        ssn: customer.ssn || '',
        address: customer.address || '',
        address2: customer.address2 || '',
        city: customer.city || '',
        state: customer.state || '',
        zipCode: customer.zipCode || '',
        customerId: customer.id,
      }}
      validationSchema={transUnionQuerySchema}
      onSubmit={(values, { setSubmitting }) => {
        setIsLoading(true);
        getAccountInformationFromTransUnion({
          variables: { input: { ...values } },
        });
        setSubmitting(false);
      }}
    >
      {(formikProps) => {
        const {
          handleSubmit,
          handleReset,
          setFieldValue,
          setFieldTouched,
          isValid,
          isSubmitting,
        } = formikProps;
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Field name="ssn">
                {(props: FieldProps) => (
                  <TextInput label="ssn" fieldProps={props} />
                )}
              </Field>
              <Field name="firstName">
                {(props: FieldProps) => (
                  <TextInput label="first name" fieldProps={props} />
                )}
              </Field>
              <Field name="middleInit">
                {(props: FieldProps) => (
                  <TextInput label="middle" fieldProps={props} />
                )}
              </Field>
              <Field name="lastName">
                {(props: FieldProps) => (
                  <TextInput label="last name" fieldProps={props} />
                )}
              </Field>
              <Field name="suffix">
                {(props: FieldProps) => (
                  <TextInput label="suffix" fieldProps={props} />
                )}
              </Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Field name="address">
                {(props: FieldProps) => (
                  <TextInput label="address" fieldProps={props} />
                )}
              </Field>
              <Field name="address2">
                {(props: FieldProps) => (
                  <TextInput label="address 2" fieldProps={props} />
                )}
              </Field>

              <Field name="city">
                {(props: FieldProps) => (
                  <TextInput label="city" fieldProps={props} />
                )}
              </Field>

              <Field
                label="state"
                name="state"
                component={SelectInput}
                options={stateOptions}
                setValue={setFieldValue}
                setTouched={setFieldTouched}
              />
              <Field name="zipCode">
                {(props: FieldProps) => (
                  <TextInput label="zip" fieldProps={props} />
                )}
              </Field>
            </Form.Group>
            <Form.Group inline>
              <Form.Button
                primary
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Submit
              </Form.Button>
              <Form.Button onClick={handleReset} disabled={isSubmitting}>
                Reset
              </Form.Button>
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
};
export default TransUnionQueryForm;

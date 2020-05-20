import React, { useState, Fragment } from 'react';
import { Form, Header, Divider } from 'semantic-ui-react';
import { Field, Formik, FieldProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { IAccountRouteParams } from '../Accounts/Accounts';
import { customerInfoSchema } from '../../validation/customerInfoSchema';
import { TextInput, SelectInput } from '../../components/FormFields';
import { stateOptions } from '../../utils/lookup';
import LoadingComponent from '../../components/Loading/Loading';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';
import {
  UPDATE_CUSTOMER,
  GET_CUSTOMER_BY_ID,
} from '../../graphql/queries/customers';
import { useCustomerInfo } from '../../utils/customerInfo';

const CustomerInformation: React.FC<RouteComponentProps<
  IAccountRouteParams
>> = ({ history }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [customer, setCustomer] = useState(null);
  const { addToast } = useToasts();
  const [callUpdateCustomer] = useMutation(UPDATE_CUSTOMER);

  const customerInfo = useCustomerInfo();

  const { data } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: {
      customerId: customerInfo.id,
    },
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.log('error', error);
      setIsLoading(false);
      addToast(
        'An error occurred retrieving customer information. Please try again.',
        { appearance: 'error' }
      );
    },
    onCompleted: ({ getCustomerById }) => {
      if (data) console.log('');
      console.log('customer', getCustomerById);
      if (getCustomerById.ok) {
        setCustomer(getCustomerById.customer);
      } else {
        addToast(
          'An error occurred retrieving customer information. Please try again.',
          { appearance: 'error' }
        );
      }

      setIsLoading(false);
    },
  });

  if (isLoading) return <LoadingComponent />;

  return (
    <Fragment>
      <Header as="h2" icon>
        {`${customerInfo.displayName}`}
      </Header>
      <Formik
        initialValues={{
          firstName: customer.firstName || '',
          middleInit: customer.middleInit || '',
          lastName: customer.lastName || '',
          ssn: customer.ssn || '',
          address: customer.address || '',
          address2: customer.address2 || '',
          city: customer.city || '',
          state: customer.state || '',
          zipCode: customer.zipCode || '',
          phoneNumber: customer.phoneNumber || '',
          accountNumber: customer.accountNumber || '',
          routingNumber: customer.routingNumber || '',
        }}
        validationSchema={customerInfoSchema}
        onSubmit={async (values) => {
          const {
            data: { updateCustomer },
          } = await callUpdateCustomer({
            variables: { input: { ...values, customerId: customerInfo.id } },
          });

          if (updateCustomer.ok) {
            // redirect to accounts page
            addToast('Your information was saved successfully!', {
              appearance: 'success',
            });
          } else {
            addToast(
              'An error occurred saving customer information. Please try again.',
              { appearance: 'error' }
            );
          }
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
              <Divider horizontal>Personal Information</Divider>
              <Form.Group widths={3}>
                <Field name="firstName">
                  {(props: FieldProps) => (
                    <TextInput
                      label="First Name"
                      fieldProps={props}
                      placeholder="First Name"
                      width={5}
                    />
                  )}
                </Field>
                <Field name="middleInit">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Middle Initial"
                      fieldProps={props}
                      placeholder="Middle Initial"
                      width={5}
                    />
                  )}
                </Field>
                <Field name="lastName">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Last Name"
                      fieldProps={props}
                      placeholder="Last Name"
                      width={5}
                    />
                  )}
                </Field>
              </Form.Group>
              <Form.Group widths={3}>
                <Field name="address">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Address"
                      fieldProps={props}
                      placeholder="Address"
                      width={5}
                    />
                  )}
                </Field>
                <Field name="address2">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Address 2"
                      fieldProps={props}
                      placeholder="Address 2"
                      width={5}
                    />
                  )}
                </Field>
                <Field name="city">
                  {(props: FieldProps) => (
                    <TextInput
                      label="City"
                      fieldProps={props}
                      placeholder="City"
                      width={5}
                    />
                  )}
                </Field>
              </Form.Group>
              <Form.Group widths={3}>
                <Field name="phoneNumber">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Phone Number"
                      fieldProps={props}
                      placeholder="Phone Number"
                      width={5}
                    />
                  )}
                </Field>
                <Field
                  name="state"
                  placeholder="State"
                  component={SelectInput}
                  width={5}
                  options={stateOptions}
                  setValue={setFieldValue}
                  setTouched={setFieldTouched}
                  label="State"
                />
                <Field name="zipCode">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Zip Code"
                      fieldProps={props}
                      placeholder="Zip Code"
                      width={5}
                    />
                  )}
                </Field>
              </Form.Group>
              <br />
              <Divider horizontal>Bank Information</Divider>
              <Form.Group widths={2}>
                <Field name="routingNumber">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Routing Number"
                      fieldProps={props}
                      placeholder="Routing Number"
                    />
                  )}
                </Field>
                <Field name="accountNumber">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Account Number"
                      fieldProps={props}
                      placeholder="Account Number"
                    />
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
    </Fragment>
  );
};

export default CustomerInformation;

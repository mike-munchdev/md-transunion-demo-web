import React, { useState, useEffect, Fragment } from 'react';
import { Message, Form, FormSelectProps, Select } from 'semantic-ui-react';
import { Field, Formik, FieldProps } from 'formik';
import jwt from 'jsonwebtoken';
import { RouteComponentProps } from 'react-router-dom';
import { IAccountRouteParams } from '../Accounts/Accounts';
import { customerInfoSchema } from '../../validation/customerInfoSchema';
import { TextInput, SelectInput } from '../../components/FormFields';
import states from '../../utils/states';
import LoadingComponent from '../../components/Loading/Loading';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  GET_TOKEN_CLIENT,
  GET_CUSTOMER_CLIENT,
} from '../../graphql/queries/localState';
import { useToasts } from 'react-toast-notifications';
import {
  UPDATE_CUSTOMER,
  GET_CUSTOMER_BY_ID,
} from '../../graphql/queries/customers';
import { ICustomer } from '../../graphql/models/customer';

const CustomerInformation: React.FC<RouteComponentProps<
  IAccountRouteParams
>> = ({ match, history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayCustomer, setDisplayCustomer] = useState(null);
  const [customer, setCustomer] = useState(null);
  const { addToast } = useToasts();
  const [callUpdateCustomer] = useMutation(UPDATE_CUSTOMER);

  const {
    data: { token },
  } = useQuery(GET_TOKEN_CLIENT);

  const decoded = jwt.decode(token);
  const decodedCustomer = (decoded as any).info;

  const { data } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: {
      customerId: decodedCustomer.id,
    },
    onCompleted: ({ getCustomerById }) => {
      if (getCustomerById.ok) {
        setDisplayCustomer(decodedCustomer);
        setCustomer(getCustomerById.customer);
      } else {
        addToast(
          'An error occurred retriving customer information. Please try again.',
          { appearance: 'error' }
        );
      }

      setIsLoading(false);
    },
  });

  if (isLoading) return <LoadingComponent />;

  return (
    <Fragment>
      <Message info>
        <p>
          {`Welcome ${displayCustomer.displayName}, please provide the following information to securely
          pull your creditor data from Transunion. This is soft pull and will
          not impact your credit score…`}
        </p>
      </Message>
      <Formik
        initialValues={{
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          ssn: customer.ssn || '',
          address: customer.address || '',
          address2: customer.address2 || '',
          city: customer.city || '',
          state: customer.state || '',
          zip: customer.zipe || '',
        }}
        validationSchema={customerInfoSchema}
        onSubmit={async (values, { resetForm, setErrors, setSubmitting }) => {
          const { data } = await callUpdateCustomer({
            variables: values,
          });

          if (data) {
            return data.classRegistration;
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
          } = formikProps;
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group unstackable widths={3}>
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
                <Field name="ssn">
                  {(props: FieldProps) => (
                    <TextInput
                      label="Social Social Security Number"
                      fieldProps={props}
                      placeholder="Social Social Security Number"
                      width={5}
                    />
                  )}
                </Field>
              </Form.Group>
              <Form.Group unstackable widths={3}>
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
              <Form.Group unstackable widths={2}>
                <Field
                  name="state"
                  placeholder="State"
                  component={SelectInput}
                  width={10}
                  options={states}
                  setValue={setFieldValue}
                  setTouched={setFieldTouched}
                  label="State"
                />
                {/* <Field name="state" >
                   {(props: FormSelectProps) => (
                    <SelectInput                      
                      label="State"
                      formSelectProps={props}
                      placeholder="State"
                      width={10}
                      options={states}
                      handleChange={setFieldValue}
                    />
                  )}
                </Field>                */}
                <Field name="zip">
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

              <Form.Group inline>
                <Form.Button primary disabled={!isValid}>
                  Submit
                </Form.Button>
                <Form.Button onClick={handleReset}>Reset</Form.Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default CustomerInformation;

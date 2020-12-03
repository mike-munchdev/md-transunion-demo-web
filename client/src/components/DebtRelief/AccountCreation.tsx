import React, { FC, useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { IDebtReliefProps } from '.';

import { Form, Image, Grid, Container, Button } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';
import { TextInput, SelectInput } from '../FormFields';
import { DebtReliefAuthContext } from '../../utils/context';
import { GET_APPLICATION_TOKEN_BY_EMAIL_AND_PHONE_NUMBER } from '../../graphql/queries/tokens';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import {
  stateOptions,
  monthOptions,
  dayOptions,
  yearOptions,
} from '../../utils/lookup';

const AccountCreation: FC<IDebtReliefProps> = ({ formikProps }) => {
  const { signIn } = useContext(DebtReliefAuthContext);
  const { addToast } = useToasts();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [getApplicationAndTokenByEmailAndPhoneNumber] = useLazyQuery(
    GET_APPLICATION_TOKEN_BY_EMAIL_AND_PHONE_NUMBER,
    {
      fetchPolicy: 'network-only',
      onError: (e) => {
        setIsLoading(false);
        addToast(
          'An error occurred retrieving customer information. Please try again.',
          { appearance: 'error' }
        );
      },
      onCompleted: ({ getApplicationAndTokenByEmailAndPhoneNumber }) => {
        const {
          ok,
          errors,
          token,
          application,
        } = getApplicationAndTokenByEmailAndPhoneNumber;
        if (ok) {
          if (!token) {
            history.push('/debtrelief/login');
          } else {
            signIn(token, application, '/debtrelief/creditors');
          }
        } else {
          addToast(errors[0].message, {
            appearance: 'error',
          });
          setIsLoading(false);
        }
      },
    }
  );
  const { values, setFieldValue, setFieldTouched } = formikProps;

  const isStepInvalid = () => {
    return (
      !!!values.applicant.email ||
      !!!values.applicant.firstName ||
      !!!values.applicant.middleName ||
      !!!values.applicant.lastName ||
      !!!values.applicant.dobMonth ||
      !!!values.applicant.dobDay ||
      !!!values.applicant.dobYear ||
      !!!values.applicant.address ||
      !!!values.applicant.city ||
      !!!values.applicant.state ||
      !!!values.applicant.zip ||
      !!!values.applicant.phoneNumber ||
      !!!values.applicant.phoneNumberConfirm
    );
  };

  return (
    <Container text className="debt-relief-container">
      <Grid
        textAlign="center"
        style={{ marginBottom: '10px', paddingBottom: '10px' }}
        verticalAlign="middle"
      >
        <Image
          src="/meredian-logo-trans.png"
          size="large"
          style={{ marginTop: '20px' }}
        />
      </Grid>

      <p>
        <strong>
          Your email adress and phone number are needed to allow you to return
          to this site at a later time to update information in your comparison.
        </strong>
      </p>
      <p>
        <strong>
          Your email address and phone number will not be disclosed, sold, or
          sent unsolicited emails not related to your comparison
        </strong>
      </p>
      <Form>
        <Container>
          <Field name="applicant.firstName">
            {(props: FieldProps) => (
              <TextInput label="First Name" fieldProps={props} placeholder="" />
            )}
          </Field>
          <Field name="applicant.middleName">
            {(props: FieldProps) => (
              <TextInput
                label="Middle Name"
                fieldProps={props}
                placeholder=""
              />
            )}
          </Field>
          <Field name="applicant.lastName">
            {(props: FieldProps) => (
              <TextInput label="Last Name" fieldProps={props} placeholder="" />
            )}
          </Field>
          <label className="form-label">Date of Birth</label>
          <Form.Group widths="equal">
            <Field
              name="applicant.dobMonth"
              placeholder="Month"
              component={SelectInput}
              options={monthOptions()}
              setValue={setFieldValue}
              setTouched={setFieldTouched}
              fluid
            />
            <Field
              name="applicant.dobDay"
              placeholder="Day"
              component={SelectInput}
              options={dayOptions(
                values.applicant.dobMonth,
                values.applicant.dobYear
              )}
              setValue={setFieldValue}
              setTouched={setFieldTouched}
              fluid
            />
            <Field
              name="applicant.dobYear"
              placeholder="Year"
              component={SelectInput}
              options={yearOptions()}
              setValue={setFieldValue}
              setTouched={setFieldTouched}
              fluid
            />
          </Form.Group>
          <Field name="applicant.address">
            {(props: FieldProps) => (
              <TextInput label="Address" fieldProps={props} placeholder="" />
            )}
          </Field>
          <Field name="applicant.address2">
            {(props: FieldProps) => (
              <TextInput
                label="Address Line 2"
                fieldProps={props}
                placeholder=""
              />
            )}
          </Field>
          <Field name="applicant.city">
            {(props: FieldProps) => (
              <TextInput label="City" fieldProps={props} placeholder="" />
            )}
          </Field>
          <Field
            name="applicant.state"
            placeholder="State"
            component={SelectInput}
            options={stateOptions}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            label="State"
            fluid
          />
          <Field name="applicant.zip">
            {(props: FieldProps) => (
              <TextInput label="Zip" fieldProps={props} placeholder="" />
            )}
          </Field>
          <Field name="applicant.email">
            {(props: FieldProps) => (
              <TextInput
                label="Email Address"
                fieldProps={props}
                placeholder="user@email.com"
              />
            )}
          </Field>

          <Field name="applicant.phoneNumber">
            {(props: FieldProps) => (
              <TextInput
                label="Primary Phone Number"
                fieldProps={props}
                placeholder="(###) ###-####"
              />
            )}
          </Field>

          <Field name="applicant.phoneNumberConfirm">
            {(props: FieldProps) => (
              <TextInput
                label="Confirm Primary Phone Number"
                fieldProps={props}
                placeholder="(###) ###-####"
              />
            )}
          </Field>

          <Button
            fluid
            disabled={isStepInvalid()}
            onClick={async () => {
              try {
                getApplicationAndTokenByEmailAndPhoneNumber({
                  variables: {
                    input: {
                      email: values.applicant.email,
                      firstName: values.applicant.firstName,
                      middleName: values.applicant.middleName,
                      lastName: values.applicant.lastName,
                      dobMonth: values.applicant.dobMonth,
                      dobDay: values.applicant.dobDay,
                      dobYear: values.applicant.dobYear,
                      address: values.applicant.address,
                      city: values.applicant.city,
                      state: values.applicant.state,
                      zip: values.applicant.zip,
                      phoneNumber: values.applicant.phoneNumber,
                      createNew: true,
                    },
                  },
                });
              } catch (error) {
                addToast(error.message, { appearance: 'error' });
              }
            }}
          >
            Continue
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default AccountCreation;

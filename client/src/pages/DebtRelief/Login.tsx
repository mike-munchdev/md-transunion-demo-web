import React, { useContext, useState } from 'react';
import { Container, Form, Image, Grid, Header } from 'semantic-ui-react';
import { Formik, Field, FieldProps } from 'formik';

import { TextInput } from '../../components/FormFields';

import { FormErrorList } from '../../components/Errors';
import { DebtReliefAuthContext } from '../../utils/context';
import { debtReliefLoginSchema } from '../../validation/debtReliefLoginSchema';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_APPLICATION_TOKEN_BY_EMAIL_AND_PHONE_NUMBER } from '../../graphql/queries/tokens';

const Login: React.FC = () => {
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
        console.log('ok', ok);
        console.log('token', token);
        console.log('application', application);
        if (ok) {
          if (!token) {
            // history.push('/debtrelief/login');
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

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
      container
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Container className="logo">
          <Image
            src="/meredian-logo-trans.png"
            size="medium"
            style={{ marginTop: '20px' }}
          />
        </Container>
        <Header as="h2">Return to Debt Comparison</Header>
        <Formik
          initialValues={{
            email: '',
            phoneNumber: '',
          }}
          validationSchema={debtReliefLoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            // const { phoneNumber, email } = values;
            // getApplicationAndTokenByEmailAndPhoneNumber({
            //   variables: { input: { email, phoneNumber } },
            // });
            // setSubmitting(false);
          }}
        >
          {(formikProps) => {
            const {
              handleSubmit,
              handleReset,
              isSubmitting,
              errors,
              touched,
              values,
            } = formikProps;

            return (
              <Form size="large" onSubmit={handleSubmit}>
                <Field name="email">
                  {(props: FieldProps) => (
                    <TextInput
                      fieldProps={props}
                      placeholder="Enter email"
                      iconName="mail"
                    />
                  )}
                </Field>
                <Field name="phoneNumber">
                  {(props: FieldProps) => (
                    <TextInput
                      fieldProps={props}
                      placeholder="Enter phone number"
                      iconName="phone"
                    />
                  )}
                </Field>

                <Form.Button
                  type="button"
                  onClick={async () => {
                    try {
                      getApplicationAndTokenByEmailAndPhoneNumber({
                        variables: {
                          input: {
                            email: values.email,
                            phoneNumber: values.phoneNumber,
                          },
                        },
                      });
                    } catch (error) {
                      addToast(error.message, { appearance: 'error' });
                    }
                  }}
                  fluid
                  size="large"
                  primary
                  disabled={isSubmitting}
                  className="form-button-fixed-width"
                >
                  Submit
                </Form.Button>
                <Form.Button
                  fluid
                  size="large"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="form-button-fixed-width"
                >
                  Reset
                </Form.Button>

                <FormErrorList errors={errors} touched={touched} />
              </Form>
            );
          }}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default Login;

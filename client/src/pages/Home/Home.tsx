import React from 'react';
import { Container, Form, Image, Grid } from 'semantic-ui-react';
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { Formik, Field, FieldProps } from 'formik';
import { useToasts } from 'react-toast-notifications';
import { useLocation, Redirect } from 'react-router-dom';
import { ApolloError } from 'apollo-client';
import get from 'lodash/get';
import { homeSchema } from '../../validation/homeSchema';
import { GET_TOKEN_BY_CODE_AND_PHONE_NUMBER } from '../../graphql/queries/tokens';

import { TextInput } from '../../components/FormFields';
import { IError } from '../../graphql/models/error';

import { FormErrorList } from '../../components/Errors';
import { useLoggedIn } from '../../utils/customerInfo';

const Home: React.FC = () => {
  const { addToast } = useToasts();
  const client = useApolloClient();
  let location = useLocation();
  const isLoggedIn = useLoggedIn();

  const [getTokenByCodeAndPhoneNumber, { loading }] = useLazyQuery(
    GET_TOKEN_BY_CODE_AND_PHONE_NUMBER,
    {
      fetchPolicy: 'network-only',
      onError: (e: ApolloError) => {
        addToast(
          'An error occurred retrieving customer information. Please try again.',
          { appearance: 'error' }
        );
      },
      onCompleted: ({ getTokenByCodeAndPhoneNumber }) => {
        const { ok, token, errors } = getTokenByCodeAndPhoneNumber;

        if (ok) {
          if (!token) {
            addToast('No customer found with the given information.', {
              appearance: 'error',
            });
          } else {
            // add client info to local cache and move to accounts page
            localStorage.setItem('token', token);

            client.writeData({
              data: {
                isLoggedIn: true,
                token,
              },
            });
          }
        } else {
          errors.forEach((e: IError) => {
            addToast(e.message, { appearance: 'error' });
          });
        }
      },
    }
  );

  if (isLoggedIn) {
    const from = get(location, 'state.from.pathname', '/');
    return (
      <Redirect
        to={from === '/' || from === '/user/login' ? '/accounts' : from}
      />
    );
  }
  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
      container
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Container className="logo">
          <Image src="/logo.png" size="medium" />
        </Container>
        <Formik
          initialValues={{
            code: '',
            phoneNumber: '',
          }}
          validationSchema={homeSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { phoneNumber, code } = values;
            getTokenByCodeAndPhoneNumber({
              variables: { code, phoneNumber },
            });
            setSubmitting(false);
          }}
        >
          {(formikProps) => {
            const {
              handleSubmit,
              handleReset,
              isSubmitting,
              errors,
              touched,
            } = formikProps;

            return (
              <Form size="large" onSubmit={handleSubmit} loading={loading}>
                <Field name="code">
                  {(props: FieldProps) => (
                    <TextInput
                      fieldProps={props}
                      placeholder="Enter code"
                      iconName="user secret"
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
                  type="submit"
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

export default Home;

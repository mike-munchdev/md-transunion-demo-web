import React from 'react';
import { Segment, Container, Form, Image } from 'semantic-ui-react';
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
    <Segment textAlign="center" vertical className="masthead">
      <Container text>
        <Container className="logo">
          <Image src="logo.png" size="medium" />
        </Container>
        <Container>
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
                <Form
                  onSubmit={handleSubmit}
                  loading={loading}
                  className="home-form"
                >
                  <Field name="code">
                    {(props: FieldProps) => (
                      <TextInput
                        fieldProps={props}
                        placeholder="Enter code"
                        width={6}
                      />
                    )}
                  </Field>
                  <Field name="phoneNumber">
                    {(props: FieldProps) => (
                      <TextInput
                        fieldProps={props}
                        placeholder="Enter phone number"
                        width={6}
                      />
                    )}
                  </Field>
                  <Form.Group widths="equal">
                    <Form.Button
                      type="submit"
                      primary
                      disabled={isSubmitting}
                      className="form-button-fixed-width"
                    >
                      Submit
                    </Form.Button>
                    <Form.Button
                      onClick={handleReset}
                      disabled={isSubmitting}
                      className="form-button-fixed-width"
                    >
                      Reset
                    </Form.Button>
                  </Form.Group>
                  <FormErrorList errors={errors} touched={touched} />
                </Form>
              );
            }}
          </Formik>
        </Container>
      </Container>
    </Segment>
  );
};

export default Home;

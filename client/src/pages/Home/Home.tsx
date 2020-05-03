import React from 'react';
import { Segment, Container, Header, Form, Message } from 'semantic-ui-react';
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { Formik, Field, FieldProps, FormikErrors } from 'formik';
import { useToasts } from 'react-toast-notifications';

import { homeSchema } from '../../validation/homeSchema';
import { GET_TOKEN_BY_CODE_AND_PHONE_NUMBER } from '../../graphql/queries/tokens';
import { useHistory } from 'react-router-dom';
import { TextInput } from '../../components/FormFields';
import { IError } from '../../graphql/models/error';
import { ApolloError } from 'apollo-client';
import FormError from '../../components/Errors/FormError';

const Home: React.FC = () => {
  const { addToast } = useToasts();
  const client = useApolloClient();
  let history = useHistory();
  const [getTokenByCodeAndPhoneNumber, { loading }] = useLazyQuery(
    GET_TOKEN_BY_CODE_AND_PHONE_NUMBER,
    {
      onError: (e: ApolloError) => {
        addToast(
          'An error occurred retriving customer information. Please try again.',
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

            history.push(`/accounts`);
          }
        } else {
          errors.forEach((e: IError) => {
            addToast(e.message, { appearance: 'error' });
          });
        }
      },
    }
  );

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          Meredian Credit Services
        </Header>

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
                  <Form.Group inline>
                    <Form.Button type="submit" primary disabled={isSubmitting}>
                      Submit
                    </Form.Button>
                    <Form.Button onClick={handleReset} disabled={isSubmitting}>
                      Reset
                    </Form.Button>
                  </Form.Group>
                  {Object.keys(errors).length > 0 && (
                    <Message error visible={true}>
                      {Object.keys(errors).map((key: string) => {
                        return (touched as any)[key] !== undefined ? (
                          <FormError error={(errors as any)[key]} key={key} />
                        ) : null;
                      })}
                    </Message>
                  )}
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

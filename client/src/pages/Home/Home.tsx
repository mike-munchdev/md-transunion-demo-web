import React, { Fragment } from 'react';
import { Segment, Container, Header, Button, Form } from 'semantic-ui-react';
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { Formik, Field, FieldProps } from 'formik';
import { useToasts } from 'react-toast-notifications';

import { ICustomer } from '../../graphql/models/customer';
import { homeSchema } from '../../validation/homeSchema';
import { GET_TOKEN_BY_CODE_AND_PHONE_NUMBER } from '../../graphql/queries/tokens';
import { useHistory } from 'react-router-dom';
import { TextInput } from '../../components/FormFields';
import { IError } from '../../graphql/models/error';
import { ApolloError } from 'apollo-client';

const Home: React.FC = ({ children }) => {
  const { addToast } = useToasts();
  const client = useApolloClient();
  let history = useHistory();
  const [getTokenByCodeAndPhoneNumber, { loading }] = useLazyQuery(
    GET_TOKEN_BY_CODE_AND_PHONE_NUMBER,
    {
      onError: (e: ApolloError) => {},
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

            history.push(`/customer`);
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
            onSubmit={(values, { resetForm, setErrors, setSubmitting }) => {
              const { phoneNumber, code } = values;
              getTokenByCodeAndPhoneNumber({
                variables: { code, phoneNumber },
              });
            }}
          >
            {(formikProps) => {
              const { handleSubmit, handleReset } = formikProps;

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
                        width={4}
                      />
                    )}
                  </Field>
                  <Field name="phoneNumber">
                    {(props: FieldProps) => (
                      <TextInput
                        fieldProps={props}
                        placeholder="Enter phone number"
                        width={4}
                      />
                    )}
                  </Field>
                  <Form.Group inline className="container-column">
                    <Form.Button type="submit" primary>
                      Submit
                    </Form.Button>
                  </Form.Group>
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

import React, { Fragment } from 'react';
import {
  Segment,
  Container,
  Header,
  Button,
  
  Form,
  Input,
} from 'semantic-ui-react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { Formik, Field, FieldProps } from 'formik';

import { IClient } from '../../graphql/models/client';
import { homeSchema } from '../../validation/homeSchema';

const Home: React.FC = ({ children }) => { 

  // const { data, client } = useQuery(GET_CLIENT_INFORMATION);
  // console.log('data', data);

  const isLoggedIn = false;
  const clientInfo: IClient | null = null;
  const token: string | null = null;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          Meredian Credit Services
        </Header>
        {isLoggedIn && clientInfo && token ? (
          <Fragment></Fragment>
        ) : (
          <Container >
            <Formik
              initialValues={{
                code: '',
              }}
              validationSchema={homeSchema}
              onSubmit={(values, { resetForm, setErrors, setSubmitting }) => {
                console.log('submitting successful form', values);
                
              }}
            >
              {(formikProps) => {
                const { handleSubmit } = formikProps;

                return (
                  <Form onSubmit={handleSubmit}>
                    <Field name="code">
                      {(props: FieldProps) => (
                        <div className="container-column">
                          <Form.Field
                            width={3}
                            control={Input}
                            {...props.field}
                            type="text"
                            placeholder="Enter Code"
                            error={
                              props.form.touched[props.field.name] &&
                              props.form.errors[props.field.name]
                                ? {
                                    content:
                                      props.form.errors[props.field.name],
                                    pointing: 'below',
                                  }
                                : null
                            }
                          />                         
                        </div>
                      )}
                    </Field>                    
                    <Button type="submit" color="blue" className="form-submit-button">
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Container>
        )}
      </Container>
    </Segment>
  );
};

export default Home;

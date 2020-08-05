import React, { useContext } from 'react';
import { Container, Form, Image, Grid } from 'semantic-ui-react';
import { Formik, Field, FieldProps } from 'formik';

import { TextInput } from '../../components/FormFields';

import { FormErrorList } from '../../components/Errors';
import { DebtReliefAuthContext } from '../../utils/context';
import { debtReliefLoginSchema } from '../../validation/debtReliefLoginSchema';

const Home: React.FC = () => {
  const { signIn } = useContext(DebtReliefAuthContext);
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
            email: '',
            phoneNumber: '',
          }}
          validationSchema={debtReliefLoginSchema}
          onSubmit={() => {
            console.log('login');
            signIn('loggedIn', {});
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

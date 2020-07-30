import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireProps } from '.';

import QuestionnaireNavigationControl from './QuestionnaireNavigationControl';
import {
  Segment,
  Header,
  Form,
  Image,
  Grid,
  Container,
  Button,
} from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';
import { TextInput } from '../FormFields';

const AccountCreation: FC<IQuestionnaireProps> = ({ formikProps }) => {
  const history = useHistory();

  const { values } = formikProps;

  const isStepInvalid = () => {
    // return false;
    return (
      !!!values.applicant.email ||
      !!!values.applicant.primaryPhoneNumber ||
      !!!values.applicant.primaryPhoneNumberConfirm
    );
  };

  return (
    <Container text>
      <Grid
        textAlign="center"
        style={{ marginBottom: '10px' }}
        verticalAlign="middle"
      >
        <Image src="/logo.png" size="large" />
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
          <Field name="applicant.email">
            {(props: FieldProps) => (
              <TextInput
                width="6"
                label="Email Address"
                fieldProps={props}
                placeholder="user@email.com"
              />
            )}
          </Field>

          <Field name="applicant.primaryPhoneNumber">
            {(props: FieldProps) => (
              <TextInput
                width="6"
                label="Primary Phone Number"
                fieldProps={props}
                placeholder="(###) ###-####"
              />
            )}
          </Field>

          <Field name="applicant.primaryPhoneNumberConfirm">
            {(props: FieldProps) => (
              <TextInput
                width="6"
                label="Confirm Primary Phone Number"
                fieldProps={props}
                placeholder="(###) ###-####"
              />
            )}
          </Field>

          <Button
            fluid
            disabled={isStepInvalid()}
            onClick={() => {
              history.push(`/debtrelief/creditors`);
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

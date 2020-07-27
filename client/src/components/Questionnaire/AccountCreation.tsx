import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps } from '.';

import NextStepGrid from './NextStepGrid';
import { Segment, Header, Form } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';
import { TextInput } from '../FormFields';

const AccountCreation: FC<IQuestionnaireStepsProps> = ({
  currentStepIndex,
  steps,
  setCurrentStepIndex,
  formikProps,
}) => {
  const history = useHistory();

  const { values } = formikProps;

  const isStepInvalid = () => {
    return false;
    // return (
    //   !!!values.applicant.email ||
    //   !!!values.applicant.primaryPhoneNumber ||
    //   !!!values.applicant.primaryPhoneNumberConfirm
    // );
  };

  return (
    <Segment attached>
      <Header size="medium">
        {currentStepIndex >= 0
          ? steps[currentStepIndex].title.toUpperCase()
          : ''}
      </Header>

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
        <Form.Group widths={3}>
          <Field name="email">
            {(props: FieldProps) => (
              <TextInput
                label="Email Address"
                fieldProps={props}
                placeholder="user@email.com"
              />
            )}
          </Field>
          <Field name="primaryPhoneNumber">
            {(props: FieldProps) => (
              <TextInput
                label="Primary Phone Number"
                fieldProps={props}
                placeholder="(###) ###-####"
              />
            )}
          </Field>
          <Field name="primaryPhoneNumberConfirm">
            {(props: FieldProps) => (
              <TextInput
                label="Confirm Primary Phone Number"
                fieldProps={props}
                placeholder="(###) ###-####"
              />
            )}
          </Field>
        </Form.Group>
      </Form>

      <NextStepGrid
        submit={currentStepIndex === steps.length - 1}
        isFirstStep={currentStepIndex === 0}
        handleNextClick={() => {
          history.push(`/questionnaire/${steps[currentStepIndex + 1].slug}`);
          setCurrentStepIndex(currentStepIndex + 1);
        }}
        handlePreviousClick={() => {
          history.push(`/questionnaire/${steps[currentStepIndex - 1].slug}`);
          setCurrentStepIndex(currentStepIndex - 1);
        }}
        nextStepButtonText="Save &amp; Continue"
        nextStepDisabled={isStepInvalid()}
      />
    </Segment>
  );
};

export default AccountCreation;

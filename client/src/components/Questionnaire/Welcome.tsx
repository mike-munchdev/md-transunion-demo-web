import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps } from '.';

import NextStepGrid from './NextStepGrid';
import { Segment, Header, Form } from 'semantic-ui-react';
import { stateOptions } from '../../utils/lookup';
import { Field } from 'formik';
import { SelectInput } from '../FormFields';

const Welcome: FC<IQuestionnaireStepsProps> = ({
  currentStepIndex,
  steps,
  setCurrentStepIndex,
  formikProps,
}) => {
  const history = useHistory();

  const { setFieldValue, setFieldTouched, values } = formikProps;
  console.log('values.applicant.state', values.applicant.state);

  const isStepInvalid = () => {
    return false;
    // return !!!values.applicant.state;
  };

  return (
    <Segment attached>
      <Header size="medium">
        {currentStepIndex >= 0
          ? steps[currentStepIndex].title.toUpperCase()
          : ''}
      </Header>

      <p>
        Welcome to Meredian's
        <strong> Free Debt Management Quote Tool. </strong>
        If you are over <strong> $3,000 in consumer debt </strong> and looking
        at years to pay off your current credit card debt, this is the program
        for you!
      </p>
      <p>Here you will be able to see:</p>
      <ul>
        <li>
          a no obligation comparison of your payments in our Debt Management
          Program
        </li>
        <li>
          a comparison of your interest rates on your current credit cards
        </li>
        <li>a comparison of time to pay off your debts</li>
        <li>overall savings in lifetime interest to pay off your debts</li>
      </ul>
      <p>
        <strong>In as little as 10 minutes </strong> you will also be able to
        create your own debt repayment budget to see if the payment in our debt
        comparison program is affordable. If the debt comparison quote shows
        that you would benefit from a Debt Management Program and your payment
        is affordable, you can continue on and complete your debt management
        program enrollment for the program online.
      </p>
      <p>
        Once the debt management program quote is complete you will receive an
        agreement, or you may call our Customer Outreach Department to go over
        your consumer information and complete the debt management program
        process.
      </p>
      <p>
        Before you can do a free debt comparison and get your quote, you will
        need to have your most recent credit card statements available. You will
        need:
      </p>
      <ul>
        <li>the NAME of the creditor</li>
        <li>BALANCE owed</li>
        <li>current INTEREST RATE</li>
        <li>MINIMUM PAYMENT DUE</li>
      </ul>
      <p>
        Try our <strong>Free Debt Management Quote Tool</strong> to see just how
        much time and money you will save in our program!
      </p>
      <Form>
        <Form.Group widths={3}>
          <Field
            name="state"
            placeholder="State"
            component={SelectInput}
            options={stateOptions}
            setValue={setFieldValue}
            setTouched={setFieldTouched}
            label="Lets start with
              what state do you reside in:"
            width={4}
            fluid
          />
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
        nextStepButtonText="Start New Debt Comparison"
        nextStepDisabled={isStepInvalid()}
      />
    </Segment>
  );
};

export default Welcome;

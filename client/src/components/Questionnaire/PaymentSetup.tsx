import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps } from '.';

import QuestionnaireNavigationControl from './QuestionnaireNavigationControl';
import { Segment, Header, Message, Form, Grid, Image } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';
import { TextInput, SelectInput } from '../FormFields';
import {
  monthOptions,
  bankAccountTypeOptions,
  dayToMakePaymentOptions,
} from '../../utils/lookup';
import CalculationsTable from './CalculationsTable';

const PaymentSetup: FC<IQuestionnaireStepsProps> = ({
  currentStepIndex,
  steps,
  setCurrentStepIndex,
  formikProps,
}) => {
  const history = useHistory();

  const { values, setFieldValue, setFieldTouched } = formikProps;
  const { creditors } = values;
  const isStepInvalid = () => {
    return false;
  };

  return (
    <Segment attached>
      <Header size="medium">
        {currentStepIndex >= 0
          ? steps[currentStepIndex].title.toUpperCase()
          : ''}
      </Header>
      <Form>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Field name="bankName">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Bank Name"
                          fieldProps={props}
                          placeholder=""
                        />
                      )}
                    </Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field name="bankRoutingNumber">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Bank Routing Number"
                          fieldProps={props}
                          placeholder=""
                        />
                      )}
                    </Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field name="bankAccountNumber">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Bank Account Number"
                          fieldProps={props}
                          placeholder=""
                        />
                      )}
                    </Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <label className="form-label">
                      Where To Find Routing and Account Numbers on checks
                    </label>
                    <Image src="/checksample.gif" size={'medium'} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="bankAccountType"
                      placeholder="Account Type"
                      component={SelectInput}
                      options={bankAccountTypeOptions}
                      setValue={setFieldValue}
                      setTouched={setFieldTouched}
                      label="Account Type"
                      fluid
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="dayToMakePayment"
                      placeholder="Days"
                      component={SelectInput}
                      options={dayToMakePaymentOptions()}
                      setValue={setFieldValue}
                      setTouched={setFieldTouched}
                      label="Day To Make Payment"
                      fluid
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="secondDayToMakePayment"
                      placeholder="Days"
                      component={SelectInput}
                      options={dayToMakePaymentOptions(true)}
                      setValue={setFieldValue}
                      setTouched={setFieldTouched}
                      label="Second Day To Make Payment"
                      fluid
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="monthToStart"
                      placeholder="Start"
                      component={SelectInput}
                      options={monthOptions()}
                      setValue={setFieldValue}
                      setTouched={setFieldTouched}
                      label="Month To Start"
                      fluid
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Message>
                <p>
                  Sorry, but your selected start month and day falls within our
                  14 day setup period. Your first draft date will be September 1
                  2020
                </p>
                <p>
                  Your monthly payments will be: $27.00 on the 1st of each
                  month.
                </p>
                <p>
                  Please call all your creditors that have due dates before 15th
                  and ask them to change your due date to 15th of each month.
                  This will help ensure your payments arrive on time.
                </p>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <QuestionnaireNavigationControl
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
      <CalculationsTable creditors={creditors} />
    </Segment>
  );
};

export default PaymentSetup;

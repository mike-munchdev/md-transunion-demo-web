import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps } from '.';

import QuestionnaireNavigationControl from './QuestionnaireNavigationControl';
import { Segment, Header, Form, Grid } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';
import { TextInput } from '../FormFields';

const Budget: FC<IQuestionnaireStepsProps> = ({
  currentStepIndex,
  steps,
  setCurrentStepIndex,
  formikProps,
}) => {
  const history = useHistory();

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
      <p>
        <strong>This is the section where you will enter your budget.</strong>
      </p>
      <Form>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <strong>Income</strong>
            </Grid.Column>
            <Grid.Column>
              <strong>Expenses</strong>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="income.monthlyNetPay">
                {(props: FieldProps) => (
                  <TextInput
                    label="Your Monthly Net Pay"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="expenses.monthlyRent">
                {(props: FieldProps) => (
                  <TextInput
                    label="Monthly Rent"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="income.coApplicantMonthlyNetPay">
                {(props: FieldProps) => (
                  <TextInput
                    label="Co-Applicant Monthly Net Pay"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="expenses.mortgage">
                {(props: FieldProps) => (
                  <TextInput
                    label="Mortgage"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="income.ssnIncome">
                {(props: FieldProps) => (
                  <TextInput
                    label="Social Security Income"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="expenses.utilities">
                {(props: FieldProps) => (
                  <TextInput
                    label="Utilities"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="income.retirementPay">
                {(props: FieldProps) => (
                  <TextInput
                    label="Retirement Pay"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="expenses.groceries">
                {(props: FieldProps) => (
                  <TextInput
                    label="Groceries"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="income.otherGovtBenefits">
                {(props: FieldProps) => (
                  <TextInput
                    label="Other Government Benefits"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="expenses.automobilePayments">
                {(props: FieldProps) => (
                  <TextInput
                    label="Automobile Payments"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="income.childSupport">
                {(props: FieldProps) => (
                  <TextInput
                    label="Child Support"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="expenses.automobileExpenses">
                {(props: FieldProps) => (
                  <TextInput
                    label="Automobile Expenses"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="income.allOtherIncome">
                {(props: FieldProps) => (
                  <TextInput
                    label="All Other Income"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="expenses.medical">
                {(props: FieldProps) => (
                  <TextInput
                    label="Medical"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column />
            <Grid.Column>
              <Field name="expenses.insurance">
                {(props: FieldProps) => (
                  <TextInput
                    label="Insurance (Automobile, Medical, Life, Home, etc)"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column />
            <Grid.Column>
              <Field name="expenses.dayCare">
                {(props: FieldProps) => (
                  <TextInput
                    label="Day Care"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column />
            <Grid.Column>
              <Field name="expenses.childSupport">
                {(props: FieldProps) => (
                  <TextInput
                    label="Child Support"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column />
            <Grid.Column>
              <Field name="expenses.installmentLoans">
                {(props: FieldProps) => (
                  <TextInput
                    label="Installment Loans"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column />
            <Grid.Column>
              <Field name="expenses.allOther">
                {(props: FieldProps) => (
                  <TextInput
                    label="All Other"
                    fieldProps={props}
                    placeholder="$0.00"
                  />
                )}
              </Field>
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
    </Segment>
  );
};

export default Budget;

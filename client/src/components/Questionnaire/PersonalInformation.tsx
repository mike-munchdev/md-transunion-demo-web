import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps } from '.';

import QuestionnaireNavigationControl from './QuestionnaireNavigationControl';
import { Segment, Header, Form, Grid, Button } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';
import { TextInput, SelectInput } from '../FormFields';
import {
  stateOptions,
  monthOptions,
  dayOptions,
  yearOptions,
  martialStatusOptions,
  hardshipReasonsOptions,
} from '../../utils/lookup';
import CalculationsTable from './CalculationsTable';

const PersonalInformation: FC<IQuestionnaireStepsProps> = ({
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
      <p>
        <strong>This is the section where you will enter your budget.</strong>
      </p>
      <Form>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <strong>Applicant</strong>
            </Grid.Column>
            <Grid.Column>
              <strong>Co-Applicant</strong>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.firstName">
                {(props: FieldProps) => (
                  <TextInput
                    label="First Name"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.firstName">
                {(props: FieldProps) => (
                  <TextInput
                    label="First Name"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.middleName">
                {(props: FieldProps) => (
                  <TextInput
                    label="Middle Name"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.middleName">
                {(props: FieldProps) => (
                  <TextInput
                    label="Middle Name"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.lastName">
                {(props: FieldProps) => (
                  <TextInput
                    label="Last Name"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.lastName">
                {(props: FieldProps) => (
                  <TextInput
                    label="Last Name"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Button
                primary
                icon="copy outline"
                content="Copy Address From Applicant"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.address">
                {(props: FieldProps) => (
                  <TextInput
                    label="Address"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.address">
                {(props: FieldProps) => (
                  <TextInput
                    label="Address"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.address2">
                {(props: FieldProps) => (
                  <TextInput
                    label="Address Line 2"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.address2">
                {(props: FieldProps) => (
                  <TextInput
                    label="Address Line 2"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.city">
                {(props: FieldProps) => (
                  <TextInput label="City" fieldProps={props} placeholder="" />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.city">
                {(props: FieldProps) => (
                  <TextInput label="City" fieldProps={props} placeholder="" />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field
                name="applicant.state"
                placeholder="State"
                component={SelectInput}
                options={stateOptions}
                setValue={setFieldValue}
                setTouched={setFieldTouched}
                label="State"
                fluid
              />
            </Grid.Column>
            <Grid.Column>
              <Field
                name="coApplicant.state"
                placeholder="State"
                component={SelectInput}
                options={stateOptions}
                setValue={setFieldValue}
                setTouched={setFieldTouched}
                label="State"
                fluid
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.zip">
                {(props: FieldProps) => (
                  <TextInput label="Zip" fieldProps={props} placeholder="" />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.zip">
                {(props: FieldProps) => (
                  <TextInput label="Zip" fieldProps={props} placeholder="" />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.email">
                {(props: FieldProps) => (
                  <TextInput
                    label="E-mail Address"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.email">
                {(props: FieldProps) => (
                  <TextInput
                    label="E-mail Address"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Button
                primary
                icon="copy outline"
                content="Copy Phone Numbers From Applicant"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.primaryPhoneNumber">
                {(props: FieldProps) => (
                  <TextInput
                    label="Primary Phone Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.primaryPhoneNumber">
                {(props: FieldProps) => (
                  <TextInput
                    label="Primary Phone Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.cellPhoneNumber">
                {(props: FieldProps) => (
                  <TextInput
                    label="Cell Phone Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.cellPhoneNumber">
                {(props: FieldProps) => (
                  <TextInput
                    label="Cell Phone Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.faxNumber">
                {(props: FieldProps) => (
                  <TextInput
                    label="Fax Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.faxNumber">
                {(props: FieldProps) => (
                  <TextInput
                    label="Fax Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <label className="form-label">Date of Birth</label>
              <Form.Group widths="equal">
                <Field
                  name="applicant.dobMonth"
                  placeholder="Month"
                  component={SelectInput}
                  options={monthOptions()}
                  setValue={setFieldValue}
                  setTouched={setFieldTouched}
                  fluid
                />
                <Field
                  name="applicant.dobDay"
                  placeholder="Day"
                  component={SelectInput}
                  options={dayOptions(
                    values.applicant.dobMonth,
                    values.applicant.dobYear
                  )}
                  setValue={setFieldValue}
                  setTouched={setFieldTouched}
                  fluid
                />
                <Field
                  name="applicant.dobYear"
                  placeholder="Year"
                  component={SelectInput}
                  options={yearOptions()}
                  setValue={setFieldValue}
                  setTouched={setFieldTouched}
                  fluid
                />
              </Form.Group>
            </Grid.Column>
            <Grid.Column>
              <label className="form-label">Date of Birth</label>
              <Form.Group widths="equal">
                <Field
                  name="coApplicant.dobMonth"
                  placeholder="Month"
                  component={SelectInput}
                  options={monthOptions()}
                  setValue={setFieldValue}
                  setTouched={setFieldTouched}
                  fluid
                />
                <Field
                  name="coApplicant.dobDay"
                  placeholder="Day"
                  component={SelectInput}
                  options={dayOptions(
                    values.applicant.dobMonth,
                    values.applicant.dobYear
                  )}
                  setValue={setFieldValue}
                  setTouched={setFieldTouched}
                  fluid
                />
                <Field
                  name="coApplicant.dobYear"
                  placeholder="Year"
                  component={SelectInput}
                  options={yearOptions()}
                  setValue={setFieldValue}
                  setTouched={setFieldTouched}
                  fluid
                />
              </Form.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.ssn">
                {(props: FieldProps) => (
                  <TextInput
                    label="Social Security Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.ssn">
                {(props: FieldProps) => (
                  <TextInput
                    label="Social Security Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.employer">
                {(props: FieldProps) => (
                  <TextInput
                    label="Employer"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.employer">
                {(props: FieldProps) => (
                  <TextInput
                    label="Employer"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.occupation">
                {(props: FieldProps) => (
                  <TextInput
                    label="Occupation"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.occupation">
                {(props: FieldProps) => (
                  <TextInput
                    label="Occupation"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field name="applicant.workPhoneNumber">
                {(props: FieldProps) => (
                  <TextInput
                    label="Work Phone Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
            <Grid.Column>
              <Field name="coApplicant.workPhoneNumber">
                {(props: FieldProps) => (
                  <TextInput
                    label="Work Phone Number"
                    fieldProps={props}
                    placeholder=""
                  />
                )}
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field
                name="applicant.maritalStatus"
                placeholder="Marital Status"
                component={SelectInput}
                options={martialStatusOptions}
                setValue={setFieldValue}
                setTouched={setFieldTouched}
                label="Marital Status"
                fluid
              />
            </Grid.Column>
            <Grid.Column>
              <Field
                name="coApplicant.maritalStatus"
                placeholder="Marital Status"
                component={SelectInput}
                options={martialStatusOptions}
                setValue={setFieldValue}
                setTouched={setFieldTouched}
                label="Marital Status"
                fluid
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Field
                name="applicant.hardshipReason"
                placeholder="Hardship Reason"
                component={SelectInput}
                options={hardshipReasonsOptions}
                setValue={setFieldValue}
                setTouched={setFieldTouched}
                label="Reason for joining Plan"
                fluid
              />
            </Grid.Column>
            <Grid.Column />
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

export default PersonalInformation;

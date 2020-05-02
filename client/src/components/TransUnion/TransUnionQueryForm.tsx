import React from 'react';
import { Field, FieldProps, Formik } from 'formik';
import { TextInput, SelectInput } from '../FormFields';
import { Form } from 'semantic-ui-react';
import { stateOptions } from '../../utils/states';
import { transUnionQuerySchema } from '../../validation/transUnionQuerySchema';

const TransUnionQueryForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        ssn: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      }}
      validationSchema={transUnionQuerySchema}
      onSubmit={async () => {}}
    >
      {(formikProps) => {
        const {
          handleSubmit,
          handleReset,
          setFieldValue,
          setFieldTouched,
          isValid,
          isSubmitting,
        } = formikProps;
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Field name="firstName">
                {(props: FieldProps) => (
                  <TextInput
                    fieldProps={props}
                    placeholder="First Name"
                    width={5}
                  />
                )}
              </Field>
              <Field name="lastName">
                {(props: FieldProps) => (
                  <TextInput
                    fieldProps={props}
                    placeholder="Last Name"
                    width={5}
                  />
                )}
              </Field>
              <Field name="ssn">
                {(props: FieldProps) => (
                  <TextInput
                    fieldProps={props}
                    placeholder="SSN"
                    width={5}
                  />
                )}
              </Field>

              <Field name="address">
                {(props: FieldProps) => (
                  <TextInput
                    fieldProps={props}
                    placeholder="Address"
                    width={5}
                  />
                )}
              </Field>
              <Field name="address2">
                {(props: FieldProps) => (
                  <TextInput
                    fieldProps={props}
                    placeholder="Address 2"
                    width={5}
                  />
                )}
              </Field>
              <Field name="city">
                {(props: FieldProps) => (
                  <TextInput fieldProps={props} placeholder="City" width={5} />
                )}
              </Field>

              <Field
                name="state"
                placeholder="State"
                component={SelectInput}
                width={5}
                options={stateOptions}
                setValue={setFieldValue}
                setTouched={setFieldTouched}
              />
              <Field name="zip">
                {(props: FieldProps) => (
                  <TextInput
                    fieldProps={props}
                    placeholder="Zip Code"
                    width={5}
                  />
                )}
              </Field>
            </Form.Group>
            <Form.Group inline>
              <Form.Button
                primary
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Submit
              </Form.Button>
              <Form.Button onClick={handleReset} disabled={isSubmitting}>
                Reset
              </Form.Button>
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
};
export default TransUnionQueryForm;

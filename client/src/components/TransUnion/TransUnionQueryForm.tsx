import React from 'react';
import { Field, FieldProps, Formik } from 'formik';
import { TextInput, SelectInput } from '../FormFields';
import { Form } from 'semantic-ui-react';
import { stateOptions } from '../../utils/states';
import { transUnionQuerySchema } from '../../validation/transUnionQuerySchema';
import { ICustomer } from '../../graphql/models/customer';

export interface ITransUnionQueryFormProps {
  customer: ICustomer;
}
const TransUnionQueryForm: React.FC<ITransUnionQueryFormProps> = ({
  customer,
}) => {
  return (
    <Formik
      initialValues={{
        firstName: customer.firstName || '',
        middleName: customer.middleName || '',
        lastName: customer.lastName || '',
        suffix: customer.suffix || '',
        ssn: customer.ssn || '',
        address: customer.address || '',
        address2: customer.address2 || '',
        city: customer.city || '',
        state: customer.state || '',
        zip: customer.zip || '',
      }}
      validationSchema={transUnionQuerySchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log('submitting with values', values);
      }}
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
              <Field name="ssn">
                {(props: FieldProps) => (
                  <TextInput label="ssn" fieldProps={props} />
                )}
              </Field>
              <Field name="firstName">
                {(props: FieldProps) => (
                  <TextInput label="first name" fieldProps={props} />
                )}
              </Field>
              <Field name="middleName">
                {(props: FieldProps) => (
                  <TextInput label="middle" fieldProps={props} />
                )}
              </Field>
              <Field name="lastName">
                {(props: FieldProps) => (
                  <TextInput label="last name" fieldProps={props} />
                )}
              </Field>
              <Field name="suffix">
                {(props: FieldProps) => (
                  <TextInput label="suffix" fieldProps={props} />
                )}
              </Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Field name="address">
                {(props: FieldProps) => (
                  <TextInput label="address" fieldProps={props} />
                )}
              </Field>
              <Field name="address2">
                {(props: FieldProps) => (
                  <TextInput label="address 2" fieldProps={props} />
                )}
              </Field>
              <Field name="city">
                {(props: FieldProps) => (
                  <TextInput label="city" fieldProps={props} />
                )}
              </Field>

              <Field
                label="state"
                name="state"
                component={SelectInput}
                F
                options={stateOptions}
                setValue={setFieldValue}
                setTouched={setFieldTouched}
              />
              <Field name="zip">
                {(props: FieldProps) => (
                  <TextInput label="zip" fieldProps={props} />
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

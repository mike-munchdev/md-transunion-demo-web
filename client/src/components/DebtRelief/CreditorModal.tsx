import React, { FC } from 'react';
import { Button, Modal, Icon, Form } from 'semantic-ui-react';
import { Field, FieldProps, Formik } from 'formik';
import { TextInput, SelectInput } from '../FormFields';
import { creditorModalSchema } from '../../validation/creditorModalSchema';
import { creditorOptions } from '../../utils/lookup';
import { ICreditor } from '.';
export interface ICreditorModal {
  handleSave: Function;
  handleOpen: Function;
  handleCancel: Function;
  isOpen: boolean;
  creditor: ICreditor;
}
const CreditorModal: FC<ICreditorModal> = ({
  handleSave,
  handleOpen,
  handleCancel,
  isOpen,
  creditor,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: creditor ? creditor.id : '',
        creditorId: creditor ? creditor.creditorId : '',
        accountNumber: creditor ? creditor.accountNumber : '',
        currentBalance: creditor ? creditor.currentBalance : 0,
        currentApr: creditor ? creditor.currentApr : 0,
        currentPayment: creditor ? creditor.currentPayment : 0,
      }}
      validationSchema={creditorModalSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => {
        const {
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          values,
        } = formikProps;

        return (
          <Modal
            trigger={
              <Button
                onClick={() => handleOpen()}
                color="green"
                content="Add Creditor"
                icon="plus"
                labelPosition="left"
                fluid
              />
            }
            onClose={() => {
              handleCancel();
            }}
            open={isOpen}
            size="small"
          >
            <Modal.Header>Add Creditor</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form onSubmit={handleSubmit}>
                  <Form.Group widths="equal">
                    <Field
                      name="creditorId"
                      placeholder="Creditor"
                      component={SelectInput}
                      options={creditorOptions}
                      setValue={setFieldValue}
                      setTouched={setFieldTouched}
                      label="Select Creditor"
                      fluid
                    />
                  </Form.Group>

                  <Form.Group widths={2}>
                    <Field name="accountNumber">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Account Number"
                          fieldProps={props}
                          placeholder="##########"
                        />
                      )}
                    </Field>
                    <Field name="currentBalance">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Current Balance"
                          fieldProps={props}
                          placeholder="##########"
                        />
                      )}
                    </Field>
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Field name="currentApr">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Current APR"
                          fieldProps={props}
                          placeholder="##########"
                        />
                      )}
                    </Field>
                    <Field name="currentPayment">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Current Payment"
                          fieldProps={props}
                          placeholder="##########"
                        />
                      )}
                    </Field>
                  </Form.Group>
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button
                primary
                onClick={() => {
                  handleSave(values);
                }}
              >
                <Icon name="save" /> Save
              </Button>
              <Button
                negative
                onClick={() => {
                  handleCancel();
                }}
              >
                <Icon name="close" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default CreditorModal;

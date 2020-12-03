import React, { FC } from 'react';
import { Button, Modal, Icon, Form, Label } from 'semantic-ui-react';
import { Field, FieldProps, Formik } from 'formik';
import { TextInput } from '../FormFields';
import { IApplicantInformation } from '.';
import { helpModalSchema } from '../../validation/helpModalSchema';

export interface IHelpModal {
  handleSave: Function;
  handleOpen: Function;
  handleCancel: Function;
  isOpen: boolean;
  applicant: IApplicantInformation;
}

const HelpModal: FC<IHelpModal> = ({
  handleSave,
  handleOpen,
  handleCancel,
  isOpen,
  applicant,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: applicant ? applicant.firstName : '',
        lastName: applicant ? applicant.lastName : '',
        phoneNumber: applicant ? applicant.phoneNumber : '',
        email: applicant ? applicant.email : '',
      }}
      validationSchema={helpModalSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => {
        const { handleSubmit, values } = formikProps;

        return (
          <Modal
            trigger={
              <Button
                as="div"
                labelPosition="right"
                onClick={() => handleOpen()}
              >
                <Button icon color="blue">
                  <Icon name="help" />
                </Button>
                <Label as="a" basic color="blue">
                  Get Help
                </Label>
              </Button>
            }
            onClose={() => {
              handleCancel();
            }}
            open={isOpen}
            size="small"
          >
            <Modal.Header>Help Request</Modal.Header>

            <Modal.Content>
              <Modal.Description>
                Please Verify Your Information
                <br />
                <Form onSubmit={handleSubmit}>
                  <Form.Group widths={2}>
                    <Field name="firstName">
                      {(props: FieldProps) => (
                        <TextInput label="First Name" fieldProps={props} />
                      )}
                    </Field>
                    <Field name="lastName">
                      {(props: FieldProps) => (
                        <TextInput label="Last Name" fieldProps={props} />
                      )}
                    </Field>
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Field name="email">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Email"
                          fieldProps={props}
                          placeholder="abc@xyz.com"
                        />
                      )}
                    </Field>
                    <Field name="phoneNumber">
                      {(props: FieldProps) => (
                        <TextInput
                          label="Phone Number"
                          fieldProps={props}
                          placeholder="(###)-###-####"
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
                <Icon name="send" /> Send
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

export default HelpModal;

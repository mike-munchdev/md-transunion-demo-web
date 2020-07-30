import React, { FC, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { IQuestionnaireStepsProps, ICreditor } from '.';

import QuestionnaireNavigationControl from './QuestionnaireNavigationControl';
import { Segment, Header, Button, Table, Icon, Grid } from 'semantic-ui-react';
import CreditorModal from './CreditorModal';
import { creditorOptions } from '../../utils/lookup';
import { uniqueId } from 'lodash';
import CalculationsTable from './CalculationsTable';

const Creditors: FC<IQuestionnaireStepsProps> = ({
  currentStepIndex,
  steps,
  setCurrentStepIndex,
  formikProps,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCreditor, setSelectedCreditor] = useState(null);
  const history = useHistory();

  const { values, setFieldValue } = formikProps;
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
      <CreditorModal
        creditor={selectedCreditor}
        handleSave={(creditor: ICreditor) => {
          console.log('creditor', creditor);
          if (creditor.id) {
            console.log('editing');
            const filteredCreditors = creditors.filter(
              (c) => c.id !== creditor.id
            );
            setFieldValue('creditors', [...filteredCreditors, { ...creditor }]);
          } else {
            console.log('adding');
            setFieldValue('creditors', [
              ...creditors,
              { ...creditor, id: uniqueId() },
            ]);
          }

          setModalOpen(false);
        }}
        handleCancel={() => {
          setModalOpen(false);
        }}
        handleOpen={() => {
          console.log('handleOpen');
          setSelectedCreditor(null);
          setModalOpen(true);
        }}
        isOpen={modalOpen}
      />

      {creditors && creditors.length > 0 ? (
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="left" width={5}>
                Creditor Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="left" width={2}>
                Account Number
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Balance</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Current APR</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Payment</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Plan APR</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                Plan Payment
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {creditors &&
              creditors.map((creditor: ICreditor) => (
                <Table.Row key={creditor.id}>
                  <Table.Cell textAlign="left">
                    {creditorOptions[creditor.creditorId].text}
                  </Table.Cell>
                  <Table.Cell textAlign="left">
                    {creditor.accountNumber}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {creditor.currentBalance}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {creditor.currentApr}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {creditor.currentPayment}
                  </Table.Cell>
                  <Table.Cell textAlign="right">0</Table.Cell>
                  <Table.Cell textAlign="right">0</Table.Cell>
                  <Table.Cell textAlign="right">
                    <Grid columns={2} divided textAlign="center">
                      <Grid.Row>
                        <Grid.Column>
                          <Button
                            primary
                            icon
                            size="small"
                            onClick={() => {
                              console.log('creditor', creditor);
                              setSelectedCreditor(creditor);
                              setModalOpen(true);
                            }}
                          >
                            <Icon name="edit" />
                          </Button>
                        </Grid.Column>
                        <Grid.Column>
                          <Button
                            color="red"
                            icon
                            size="small"
                            onClick={() => {
                              const filteredCreditors = creditors.filter(
                                (c) => c.id !== creditor.id
                              );
                              setFieldValue('creditors', filteredCreditors);
                            }}
                          >
                            <Icon name="delete" />
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      ) : null}
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
        nextStepButtonText="Next"
        nextStepDisabled={isStepInvalid()}
      />
      <CalculationsTable creditors={creditors} />
    </Segment>
  );
};

export default Creditors;

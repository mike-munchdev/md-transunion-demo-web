import React, { FC, useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { IDebtReliefStepsProps, ICreditor } from '.';

import DebtReliefNavigationControl from './DebtReliefNavigationControl';
import { Segment, Header, Button, Table, Icon, Grid } from 'semantic-ui-react';
import CreditorModal from './CreditorModal';
import { creditorOptions } from '../../utils/lookup';
import { uniqueId } from 'lodash';
import CalculationsTable from './CalculationsTable';
import { DebtReliefContext } from '../../utils/context';
import { UPDATE_APPLICATION } from '../../graphql/queries/applications';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';

const Creditors: FC<IDebtReliefStepsProps> = ({
  stepIndex,
  steps,
  formikProps,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCreditor, setSelectedCreditor] = useState(null);
  const {
    currentStepIndex,
    setCurrentStepIndexContext,
    getApplicationContext,
  } = useContext(DebtReliefContext);
  const { addToast } = useToasts();
  const history = useHistory();
  const applicationContext = getApplicationContext();
  const [isLoading, setIsLoading] = useState(false);

  const [callUpdateApplication] = useMutation(UPDATE_APPLICATION);

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
        handleSave={async (creditor: ICreditor) => {
          try {
            const {
              data: { updateApplication },
            } = await callUpdateApplication({
              variables: {
                creditors: [...applicationContext.creditors, creditor],
              },
            });
            const { ok, errors, application } = updateApplication;
            if (ok) {
            } else {
              addToast(errors[0].message, {
                appearance: 'error',
              });
              setIsLoading(false);
            }
          } catch (error) {
            setIsLoading(false);
            addToast(
              'An error occurred retrieving customer information. Please try again.',
              { appearance: 'error' }
            );
          }

          // if (creditor.id) {
          //   const filteredCreditors = creditors.filter(
          //     (c) => c.id !== creditor.id
          //   );
          //   setFieldValue('creditors', [...filteredCreditors, { ...creditor }]);
          // } else {
          //   setFieldValue('creditors', [
          //     ...creditors,
          //     { ...creditor, id: uniqueId() },
          //   ]);
          // }

          setModalOpen(false);
        }}
        handleCancel={() => {
          setModalOpen(false);
        }}
        handleOpen={() => {
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
      <DebtReliefNavigationControl
        submit={currentStepIndex === steps.length - 1}
        isFirstStep={currentStepIndex === 0}
        handleNextClick={() => {
          history.push(`/debtrelief/${steps[currentStepIndex + 1].slug}`);
          setCurrentStepIndexContext(currentStepIndex + 1);
        }}
        handlePreviousClick={() => {
          history.push(`/debtrelief/${steps[currentStepIndex - 1].slug}`);
          setCurrentStepIndexContext(currentStepIndex - 1);
        }}
        nextStepButtonText="Next"
        nextStepDisabled={isStepInvalid()}
      />
      <CalculationsTable creditors={creditors} />
    </Segment>
  );
};

export default Creditors;

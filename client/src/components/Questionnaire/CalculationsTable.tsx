import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { reduce } from 'lodash';
import { ICreditor } from '.';

export interface ICalculationsTable {
  creditors: ICreditor[];
}
const CalculationsTable: FC<ICalculationsTable> = ({ creditors }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.HeaderCell width={3} />
        <Table.HeaderCell width={3}>On Your Own</Table.HeaderCell>
        <Table.HeaderCell width={3}>On Our Plan</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Average APR</Table.Cell>
          <Table.Cell>16.000%</Table.Cell>
          <Table.Cell>9.900%</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Total Monthly Payment</Table.Cell>
          <Table.Cell>
            {reduce(
              creditors,
              (sum, c) => sum + Number(c.currentPayment),
              0
            ).toFixed(2)}
          </Table.Cell>
          <Table.Cell>$27.00†</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Est. Years to Payoff</Table.Cell>
          <Table.Cell>0.92</Table.Cell>
          <Table.Cell>4.33</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Monthly Interest</Table.Cell>
          <Table.Cell>$13.33</Table.Cell>
          <Table.Cell>$8.25</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Total Interest</Table.Cell>
          <Table.Cell>$39.04</Table.Cell>
          <Table.Cell>$230.42</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Est. Savings</Table.Cell>
          <Table.Cell>$0.00</Table.Cell>
          <Table.Cell>$0.00</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colspan="3">
            †Your plan payment of $27.00 includes a state allowed monthly fee of
            $3.00.
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default CalculationsTable;

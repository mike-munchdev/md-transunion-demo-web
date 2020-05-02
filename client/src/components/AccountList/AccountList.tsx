import React from 'react';

import AccountItem from './AccountItem';
import { IAccount } from '../../graphql/models/account';
import { Table } from 'semantic-ui-react';

export interface IAccountListProps {
  accounts: IAccount[];
  rowsSelectable: boolean;
}

const AccountList: React.FC<IAccountListProps> = ({
  accounts,
  rowsSelectable,
}) => (
  <Table
    compact
    celled={rowsSelectable}
    definition={rowsSelectable}
  >
    <Table.Header>
      <Table.Row>
        {rowsSelectable ? <Table.HeaderCell /> : null}
        <Table.HeaderCell>TU Creditor</Table.HeaderCell>
        <Table.HeaderCell>Acct Balance</Table.HeaderCell>
        <Table.HeaderCell>Limit</Table.HeaderCell>
        <Table.HeaderCell>Available Credit</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Account Number</Table.HeaderCell>
        <Table.HeaderCell>Payment Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {accounts &&
        accounts.map((account: IAccount) => <AccountItem rowSelectable={rowsSelectable}  account={account} />)}
    </Table.Body>
  </Table>
);

export default AccountList;

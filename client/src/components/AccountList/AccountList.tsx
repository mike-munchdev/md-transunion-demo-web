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
  <Table compact celled={rowsSelectable} definition={rowsSelectable}>
    <Table.Header>
      <Table.Row>
        {rowsSelectable ? <Table.HeaderCell /> : null}
        <Table.HeaderCell textAlign="left">TU Creditor</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">Acct Balance</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">Limit</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">Available Credit</Table.HeaderCell>
        <Table.HeaderCell width={3} textAlign="center">Rating</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">Account Number</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">Payment Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {accounts &&
        accounts.map((account: IAccount) => (
          <AccountItem
            rowSelectable={rowsSelectable}
            account={account}
            key={account.id}
          />
        ))}
    </Table.Body>
  </Table>
);

export default AccountList;

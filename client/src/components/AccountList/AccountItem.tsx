import React from 'react';
import { IAccount } from '../../graphql/models/account';
import { Table, Checkbox } from 'semantic-ui-react';
import Moment from 'react-moment';
export interface IAccountItemProps {
  account?: IAccount;
  rowSelectable: boolean;
}

const AccountItem: React.FC<IAccountItemProps> = ({
  account,
  rowSelectable,
}) => {
  if (!account) return null;
  return (
    <Table.Row key={account.id}>
      {rowSelectable ? (
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
      ) : null}
      <Table.Cell>{account.creditorName}</Table.Cell>
      <Table.Cell>{account.balance}</Table.Cell>
      <Table.Cell>{account.limit}</Table.Cell>
      <Table.Cell>{account.availableCredit}</Table.Cell>
      <Table.Cell>{account.accountRating}</Table.Cell>
      <Table.Cell>{account.accountNumber}</Table.Cell>
      <Table.Cell>
        <Moment format="MM/DD/YYYY">{account.paymentDate}</Moment>
      </Table.Cell>
    </Table.Row>
  );
};
export default AccountItem;

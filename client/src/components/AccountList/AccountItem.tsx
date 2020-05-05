import React from 'react';
import { IAccount, ITuAccount } from '../../graphql/models/account';
import { Table, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
export interface IAccountItemProps {
  account?: ITuAccount;
  rowSelectable: boolean;
}

const AccountItem: React.FC<IAccountItemProps> = ({
  account,
  rowSelectable,
}) => {
  if (!account) return null;
  const usdFormater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const paymentDate = moment(account.mostRecentPayment.date);
  return (
    <Table.Row key={account.id}>
      {rowSelectable ? (
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
      ) : null}
      <Table.Cell textAlign="left">{account.subscriber.name.unparsed}</Table.Cell>
      <Table.Cell textAlign="right">
        {usdFormater.format(account.currentBalance)}
      </Table.Cell>
      <Table.Cell textAlign="right">
        {usdFormater.format(account.creditLimit)}
      </Table.Cell>
      <Table.Cell textAlign="right">
        {usdFormater.format(account.creditLimit - account.currentBalance)}
      </Table.Cell>
      <Table.Cell textAlign="center">{account.accountRating}</Table.Cell>
      <Table.Cell textAlign="right">{account.accountNumber}</Table.Cell>
      <Table.Cell textAlign="right">
        {paymentDate.isValid() ? paymentDate.format('MM/DD/YYYY') : ''}
      </Table.Cell>
    </Table.Row>
  );
};
export default AccountItem;

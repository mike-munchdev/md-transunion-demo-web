import React from 'react';

import AccountItem from './AccountItem';
import { IAccount } from '../../graphql/models/account';

export interface IAccountListProps {
    accounts?: IAccount[]
}

const AccountList: React.FC<IAccountListProps> = ({accounts}) => (
  <table>
    <thead>
      <tr>
        <th>TU Creditor</th>
        <th>Acct Balance</th>
        <th>Limit</th>
        <th>Available Credit</th>
        <th>Rating</th>
        <th>Account Number</th>
        <th>Payment Date</th>
      </tr>
    </thead>
    <tbody>
      {accounts &&
        accounts.map((account:IAccount) => (
         <AccountItem account={account} />
        ))}
    </tbody>
  </table>
);

export default AccountList;

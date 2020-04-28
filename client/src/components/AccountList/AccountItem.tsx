import React from 'react';
import { IAccount } from '../../graphql/models/account';


export interface IAccountItemProps {
    account?: IAccount;
  }

const AccountItem: React.FC<IAccountItemProps> = ({account}) => {
  if (!account) return null;
  return (
    <tr key={account.id}>
      <td>{account.creditorName}</td>
      <td>{account.balance}</td>
      <td>{account.limit}</td>
      <td>{account.availableCredit}</td>
      <td>{account.rating}</td>
      <td>{account.acctNumber}</td>
      <td>{account.paymentDate}</td>
    </tr>
  );
};
export default AccountItem;

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  IAccountsData,
  IAccountDataVars,
  IAccount,
} from '../../graphql/models/account';
import AccountList from '../../components/AccountList/AccountList';
import { GET_ACCOUNTS_FOR_USER } from '../../graphql/queries/accounts';
import { useParams, RouteComponentProps } from 'react-router-dom';

export interface IAccountRouteParams {
  code: string;
}
const Accounts: React.FC<RouteComponentProps<IAccountRouteParams>> = ({
  match,
  history
}) => {
  const [accounts, setAccounts] = useState<IAccount[] | undefined>();
  // const {code} = useParams();
  const { loading } = useQuery<
    { getAccountsForUser: IAccountsData },
    IAccountDataVars
  >(GET_ACCOUNTS_FOR_USER, {
    variables: { id: 1 },
    onCompleted: ({ getAccountsForUser }) => {
      
      if (getAccountsForUser.ok) {
        setAccounts(getAccountsForUser.accounts);
      }
    },
  });

  return (
    <div>
      <h3>Available Accounts</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
       <AccountList accounts={accounts} />
      )}
    </div>
  );
};
export default Accounts;

import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { IAccountsData, ITuAccount } from '../../graphql/models/account';
import AccountList from '../../components/AccountList/AccountList';

import { RouteComponentProps } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';
import LoadingComponent from '../../components/Loading/Loading';
import { useCustomerInfo } from '../../utils/customerInfo';
import { Accordion, Message, Segment, Header } from 'semantic-ui-react';
import { TransUnionQueryForm } from '../../components/TransUnion';
import { GET_CUSTOMER_BY_ID } from '../../graphql/queries/customers';
import { ERRORS } from '../../constants/errors';
import { accountRatings } from '../../utils/lookup';

export interface IAccountRouteParams {
  code: string;
}
const Accounts: React.FC<RouteComponentProps<IAccountRouteParams>> = () => {
  const [customer, setCustomer] = useState(null);
  const [validAccounts, setValidAccounts] = useState<ITuAccount[] | undefined>(
    []
  );
  const [invalidAccounts, setInvalidAccounts] = useState<
    ITuAccount[] | undefined
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [
    closedAccountSegmentVisible,
    setClosedAccountSegmentVisible,
  ] = useState(false);

  const { addToast } = useToasts();

  const customerInfo = useCustomerInfo();
  const [getCustomerById] = useLazyQuery(GET_CUSTOMER_BY_ID, {
    fetchPolicy: 'network-only',
    onError: (error) => {
      setIsLoading(false);
      addToast(ERRORS.CUSTOMER.RETRIEVING_INFORMATION, { appearance: 'error' });
    },
    onCompleted: ({ getCustomerById }) => {
      if (getCustomerById.ok) {
        setCustomer(getCustomerById.customer);
        setIsLoading(false);
      } else {
        addToast(ERRORS.CUSTOMER.RETRIEVING_INFORMATION, {
          appearance: 'error',
        });
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    getCustomerById({
      variables: {
        customerId: customerInfo.id,
      },
    });
  }, [customerInfo.id, getCustomerById]);

  const updateAccounts = (data: IAccountsData) => {
    if (data.ok) {
      if (
        data.accounts.tradeAccounts.length > 0 ||
        data.accounts.collectionAccounts.length > 0
      ) {
        getCustomerById({
          variables: {
            customerId: customerInfo.id,
          },
        });
        setValidAccounts(
          data.accounts.tradeAccounts.filter(validAccountFilter)
        );
        setInvalidAccounts(
          [
            ...data.accounts.tradeAccounts,
            ...data.accounts.collectionAccounts,
          ].filter(invalidAccountFilter)
        );
      } else {
        getCustomerById({
          variables: {
            customerId: customerInfo.id,
          },
        });
        addToast(ERRORS.ACCOUNT.NO_ACCOUNTS_FOUND, { appearance: 'error' });
      }
    } else {
      addToast(ERRORS.ACCOUNT.RETRIEVING_INFORMATION, { appearance: 'error' });
    }
    setIsLoading(false);
  };

  const validAccountFilter = (account: ITuAccount) => {
    const rating = accountRatings.find(
      (r) => r.code === ('0' + account.accountRating).slice(-2)
    );
    const valid = rating && rating.valid;
    return (
      (account.account.type === 'CC' || account.account.type === 'CH') &&
      account.currentBalance >=
        Number(process.env.REACT_APP_MINIMUM_ACCOUNT_BALANCE) &&
      valid
    );
  };

  const invalidAccountFilter = (account: ITuAccount) => {
    const rating = accountRatings.find(
      (r) => r.code === ('0' + account.accountRating).slice(-2)
    );
    const valid = rating && rating.valid;

    return (
      (account.account.type === 'CC' || account.account.type === 'CH') &&
      (account.currentBalance <
        Number(process.env.REACT_APP_MINIMUM_ACCOUNT_BALANCE) ||
        !valid)
    );
  };
  if (isLoading) return <LoadingComponent />;

  return (
    <div>
      <Header as="h2" icon>
        Account Information
      </Header>
      <Segment>
        <h3 style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>Query TransUnion</div>
        </h3>

        <Message info>
          <p>
            {`Welcome ${customerInfo.displayName}, please provide the following information to securely
          pull your creditor data from Transunion. This is soft pull and will
          not impact your credit score.`}
          </p>
        </Message>
        <TransUnionQueryForm
          customer={customer}
          updateAccounts={updateAccounts}
        />
      </Segment>
      {validAccounts.length > 0 && (
        <Segment>
          <h3>Valid Accounts</h3>
          <Message info>
            The following accounts meet the creditor guidelines for a debt
            management program. Please let your representative know which of
            these you would like to enroll for an interest reduction.
          </Message>

          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <AccountList rowsSelectable={false} accounts={validAccounts} />
          )}
        </Segment>
      )}
      {invalidAccounts.length > 0 && (
        <Segment className="accounts-accordian">
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <Accordion>
              <Accordion.Title
                active={closedAccountSegmentVisible}
                index={0}
                onClick={() =>
                  setClosedAccountSegmentVisible(!closedAccountSegmentVisible)
                }
              >
                <h3 style={{ display: 'flex' }}>
                  <div style={{ marginRight: '20px' }}>Invalid Accounts</div>
                  <div style={{ fontWeight: 'normal' }}>[Show/Hide]</div>
                </h3>
              </Accordion.Title>
              <Accordion.Content active={closedAccountSegmentVisible}>
                <Message warning>
                  The following accounts don't necessarily meet the creditor
                  guidelines for a debt management program. If you feel any of
                  the below information is not up to date, please inform your
                  representative.
                </Message>
                <AccountList
                  rowsSelectable={false}
                  accounts={invalidAccounts}
                />
              </Accordion.Content>
            </Accordion>
          )}
        </Segment>
      )}
    </div>
  );
};
export default Accounts;

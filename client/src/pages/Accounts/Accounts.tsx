import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import {
  IAccountsData,
  IAccountDataVars,
  IAccount,
} from '../../graphql/models/account';
import AccountList from '../../components/AccountList/AccountList';
import { GET_ACCOUNTS_FOR_CUSTOMER } from '../../graphql/queries/accounts';
import { RouteComponentProps } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';
import LoadingComponent from '../../components/Loading/Loading';
import { useCustomerInfo } from '../../utils/customerInfo';
import { Accordion, Message, Segment } from 'semantic-ui-react';
import { TransUnionQueryForm } from '../../components/TransUnion';
import { invalid } from 'moment';
import { GET_CUSTOMER_BY_ID } from '../../graphql/queries/customers';

export interface IAccountRouteParams {
  code: string;
}
const Accounts: React.FC<RouteComponentProps<IAccountRouteParams>> = () => {
  const [customer, setCustomer] = useState(null);
  const [validAccounts, setOpenAccounts] = useState<IAccount[] | undefined>();
  const [invalidAccounts, setClosedAccounts] = useState<
    IAccount[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [
    closedAccountSegmentVisible,
    setClosedAccountSegmentVisible,
  ] = useState(false);
  const [transUnionSegmentVisible, setTransUnionSegmentVisible] = useState(
    true
  );

  const { addToast } = useToasts();

  const customerInfo = useCustomerInfo();

  const { data } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: {
      customerId: customerInfo.id,
    },
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.log('error', error);
      setIsLoading(false);
      addToast(
        'An error occurred retriving customer information. Please try again.',
        { appearance: 'error' }
      );
    },
    onCompleted: ({ getCustomerById }) => {
      if (getCustomerById.ok) {
        setCustomer(getCustomerById.customer);
      } else {
        addToast(
          'An error occurred retriving customer information. Please try again.',
          { appearance: 'error' }
        );
      }

      setIsLoading(false);
    },
  });

  const [getAccountsForCustomer, { loading }] = useLazyQuery(
    GET_ACCOUNTS_FOR_CUSTOMER,
    {
      variables: { customerId: customerInfo.id },
      onError: () => {
        setIsLoading(false);
        addToast(
          'An error occurred retriving customer information. Please try again.',
          { appearance: 'error' }
        );
      },
      onCompleted: ({ getAccountsForCustomer }) => {
        if (getAccountsForCustomer.ok) {
          setOpenAccounts(getAccountsForCustomer.validAccounts);
          setClosedAccounts(getAccountsForCustomer.invalidAccounts);
        } else {
          addToast(
            'An error occurred retriving account information. Please try again.',
            { appearance: 'error' }
          );
        }
        setIsLoading(false);
      },
    }
  );

  if (isLoading) return <LoadingComponent />;

  return (
    <div>
      {customer.accountCount === 0 && (
        <Segment>
          <Accordion>
            <Accordion.Title
              active={transUnionSegmentVisible}
              index={0}
              onClick={() =>
                setTransUnionSegmentVisible(!transUnionSegmentVisible)
              }
            >
              <h3 style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>Query TransUnion</div>
                <div style={{ fontWeight: 'normal' }}>[Show/Hide]</div>
              </h3>
            </Accordion.Title>
            <Accordion.Content active={transUnionSegmentVisible}>
              <Message info>
                <p>
                  {`Welcome ${customerInfo.displayName}, please provide the following information to securely
          pull your creditor data from Transunion. This is soft pull and will
          not impact your credit score.`}
                </p>
              </Message>
              <TransUnionQueryForm customer={customer} />
            </Accordion.Content>
          </Accordion>
        </Segment>
      )}
      {validAccounts && (
        <Segment>
          <h3>Valid Accounts</h3>
          <Message info>
            The following accounts meet the creditor guidelines for a debt
            management program. Please let your representative know which of
            these you would like to enroll for an interest reduction.
          </Message>

          {loading ? (
            <p>Loading ...</p>
          ) : (
            <AccountList rowsSelectable={false} accounts={validAccounts} />
          )}
        </Segment>
      )}
      {invalidAccounts && (
        <Segment className="accounts-accordian">
          {loading ? (
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
                  <div style={{ marginRight: '20px' }}>Closed Accounts</div>
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

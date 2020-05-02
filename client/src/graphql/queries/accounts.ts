import gql from 'graphql-tag';

const accountsStructure = `{
    id
    creditorName
    balance
    limit
    availableCredit
    accountRating
    accountNumber
    paymentDate
    status
}`;

export const GET_ACCOUNTS_FOR_CUSTOMER = gql`
  query GetAccountsForCustomer($customerId: String!) {
    getAccountsForCustomer(customerId: $customerId) {
      ok
      validAccounts ${accountsStructure}
      invalidAccounts ${accountsStructure}
      errors {        
        message
      }
    }
  }
`;

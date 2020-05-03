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

export const GET_ACCOUNT_INFORMATION_FROM_TRANSUNION = gql`
  query GetAccountInformationFromTransUnion($input: TransUnionInput!) {
    getAccountInformationFromTransUnion(customerId: $customerId) {
      ok
      validAccounts ${accountsStructure}
      invalidAccounts ${accountsStructure}
      errors {        
        message
      }
    }
  }
`;

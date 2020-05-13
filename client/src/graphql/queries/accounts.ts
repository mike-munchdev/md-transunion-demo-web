import gql from 'graphql-tag';

const tuAccountStructure = `{
  id
  subscriber {
    
    name {
      unparsed
    }
  }
  currentBalance
  creditLimit
  accountRating
  accountNumber
  account {
    type
  }
  mostRecentPayment {    
    date
  }
}`;
const accountsStructure = `{
  id      
  customerId
  tradeAccounts ${tuAccountStructure}
  collectionAccounts ${tuAccountStructure}
}`;

export const GET_ACCOUNTS_FOR_CUSTOMER = gql`
  query GetAccountsForCustomer($customerId: String!) {
    getAccountsForCustomer(customerId: $customerId) {
      ok
      accounts ${accountsStructure}
      errors {        
        message
      }
    }
  }
`;

export const GET_ACCOUNT_INFORMATION_FROM_TRANSUNION = gql`
  query GetAccountInformationFromTransUnion($input: TransUnionInput!) {
    getAccountInformationFromTransUnion(input: $input) {
      ok
      accounts ${accountsStructure}
      errors {        
        message
      }
    }
  }
`;

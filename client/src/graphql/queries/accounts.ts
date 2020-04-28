import gql from 'graphql-tag';

const accountsStructure = `{
    creditorName
    balance
    limit
    availableCredit
    rating
    acctNumber
    paymentDate
}`;

export const GET_ACCOUNTS_FOR_USER = gql`
  query GetAccountsForUser($id: Int!) {
    getAccountsForUser(id: $id) {
      ok
      accounts ${accountsStructure}
      errors {        
        message
      }
    }
  }
`;

import gql from 'graphql-tag';

export const IS_LOGGED_IN_CLIENT = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
export const GET_TOKEN_CLIENT = gql`
  query GetToken {
    token @client
  }
`;

export const GET_CUSTOMER_CLIENT = gql`
  query GetCustomer {
    customer @client
  }
`;

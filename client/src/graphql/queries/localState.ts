import gql from 'graphql-tag';

export const GET_CLIENT_INFORMATION = gql`
  {
    clientInformation @client
  }
`;

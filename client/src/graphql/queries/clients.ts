import gql from 'graphql-tag';

const clientsStructure = `{
    firstName
    lastName
    email
    code
  }`;

export const GET_CLIENT_BY_CODE = gql`
  query GetClientByCode($code: String!) {
    getClientByCode(code: $code) {
      ok
      client ${clientsStructure}
      errors {        
        message
      }
    }
  }
`;

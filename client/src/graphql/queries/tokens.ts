import gql from 'graphql-tag';
export const GET_TOKEN_BY_CODE_AND_PHONE_NUMBER = gql`
  query GetTokenByCodeAndPhoneNumber($code: String!, $phoneNumber: String!) {
    getTokenByCodeAndPhoneNumber(code: $code, phoneNumber: $phoneNumber) {
      ok
      token
      errors {
        message
      }
    }
  }
`;

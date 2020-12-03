import gql from 'graphql-tag';
import { applicationStructure } from './applications';
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

export const GET_APPLICATION_TOKEN_BY_EMAIL_AND_PHONE_NUMBER = gql`
  query GetApplicationAndTokenByEmailAndPhoneNumber(
    $input: GetApplicationAndTokenInput!
  ) {
    getApplicationAndTokenByEmailAndPhoneNumber(
      input: $input
    ) {
      ok
      token
      application ${applicationStructure}
      errors {
        message
      }
    }
  }
`;

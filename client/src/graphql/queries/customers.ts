import gql from 'graphql-tag';

const customersStructure = `{
    id
    firstName
    middleInit
    lastName
    suffix
    email
    code
    ssn
    phoneNumber
    address
    address2
    addressType
    addressUnit
    addressNumber
    addressType
    addressPostDirection
    addressPreDirection
    addressStreet
    city
    state
    zipCode
    accountCount
    accountNumber
    routingNumber
  }`;

export const GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($customerId: String!) {
    getCustomerById(customerId: $customerId) {
      ok
      customer ${customersStructure}
      errors {        
        message
      }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput) {
    updateCustomer(input: $input) {
      ok
      customer ${customersStructure}
      errors {        
        message
      }
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput) {
    createCustomer(input: $input) {
      ok
      customer ${customersStructure}
      errors {        
        message
      }
    }
  }
`;

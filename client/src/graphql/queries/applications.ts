import gql from 'graphql-tag';

export const applicationStructure = `{
  id
  applicant {
    id
    firstName
    middleName
    lastName
    address
    address2
    city
    state
    zip
    email
    phoneNumber
    cellPhoneNumber
    faxPhoneNumber
    dobMonth
    dobDay
    dobYear
    ssn
    employer
    occupation
    workPhoneNumber
    maritalStatus
    hardshipReason
  }
  coApplicant {
    id
    firstName
    middleName
    lastName
    address
    address2
    city
    state
    zip
    email
    phoneNumber
    cellPhoneNumber
    faxPhoneNumber
    dobMonth
    dobDay
    dobYear
    ssn
    employer
    occupation
    workPhoneNumber
    maritalStatus
    hardshipReason
  }
  income {
    id
    monthlyNetPay
    coApplicantMonthlyNetPay
    ssnIncome
    retirementPay
    otherGovtBenefits
    childSupport
    allOtherIncome        
  }
  expenses {
    id
    monthlyRent
    mortgage
    utilities
    groceries
    automobilePayments
    automobileExpenses
    medical
    insurance
    dayCare
    childSupport
    installmentLoans
    allOther
  }
  creditors {
    id
    name
    accountNumber
    currentApr
    currentPayment
    currentBalance
  }
  bankName
  bankRoutingName
  bankAccountNumber
  bankAccountType
  dayToMakePayment
  secondDayToMakePayment
  monthToStart
  contract
  supportingDocuments
  createdAt
  updatedAt 
}`;

export const GET_APPLICATION_BY_ID = gql`
  query GetApplicationById($id: String!) {
    getApplicationById(id: $id) {
      ok
      application ${applicationStructure}
      errors {        
        message
      }
    }
  }
`;

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($input: CreateApplicationInput!) {
    createApplication(input: $input) {
      ok
      application ${applicationStructure}
      errors {        
        message
      }
    }
  }
`;

export const UPDATE_APPLICATION = gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      ok
      application ${applicationStructure}
      errors {        
        message
      }
    }
  }
`;

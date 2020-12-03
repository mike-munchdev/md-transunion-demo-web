import { createContext } from 'react';
import { IApplication } from '../components/DebtRelief';

export const initialApplicationValues: IApplication = {
  applicant: {
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phoneNumber: '',
    phoneNumberConfirm: '',
    cellPhoneNumber: '',
    faxPhoneNumber: '',
    dobMonth: 0,
    dobDay: 0,
    dobYear: 0,
    ssn: '',
    employer: '',
    occupation: '',
    workPhoneNumber: '',
    maritalStatus: '',
    hardshipReason: '',
  },
  coApplicant: {
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phoneNumber: '',
    phoneNumberConfirm: '',
    cellPhoneNumber: '',
    faxPhoneNumber: '',
    dobMonth: 0,
    dobDay: 0,
    dobYear: 0,
    ssn: '',
    employer: '',
    occupation: '',
    workPhoneNumber: '',
    maritalStatus: '',
    hardshipReason: '',
  },
  creditors: [],
  income: {
    monthlyNetPay: 0,
    coApplicantMonthlyNetPay: 0,
    ssnIncome: 0,
    retirementPay: 0,
    otherGovtBenefits: 0,
    childSupport: 0,
    allOtherIncome: 0,
  },
  expenses: {
    monthlyRent: 0,
    mortgage: 0,
    utilities: 0,
    groceries: 0,
    automobilePayments: 0,
    automobileExpenses: 0,
    medical: 0,
    insurance: 0,
    dayCare: 0,
    childSupport: 0,
    installmentLoans: 0,
    allOther: 0,
  },
  bankName: '',
  bankRoutingNumber: '',
  bankAccountNumber: '',
  bankAccountType: '',
  dayToMakePayment: 0,
  secondDayToMakePayment: 0,
  monthToStart: 0,
  contract: '',
  supportingDocuments: [],
};

// let applicationContext: IApplication | null = null;
// let currentStepIndex = 0;

type DebtReliefContextProps = {
  currentStepIndex: number;
  setCurrentStepIndexContext: (index: number) => void;

  setApplicationContext: (application: IApplication) => void;
  getApplicationContext: () => IApplication | null;
  application: IApplication | null;
};

type DebtReliefAuthContextProps = {
  redirect: (location: string) => void;
  signIn: (token: string, application: any, location?: string) => void;
  signOut: () => void;
  signUp: (message: string) => void;
  isLoggedIn: boolean;
};

export const CustomerInfoContext = createContext({
  customerInfo: {
    displayName: '',
    id: '',
  },
  setCustomerInfo: () => {},
});

// export const defalutDebtReliefContext = {
//   currentStepIndex,
//   setCurrentStepIndexContext: (index: number) => {
//     currentStepIndex = 0;
//   },
//   setApplicationContext: (application: IApplication) => {
//     applicationContext = application;
//   },
//   getApplicationContext: () => {
//     const applicationFromLocalStorage = localStorage.getItem('drApplication');

//     return applicationContext
//       ? applicationContext
//       : applicationFromLocalStorage
//       ? JSON.parse(applicationFromLocalStorage)
//       : null;
//   },
//   application: applicationContext,
// };

export const DebtReliefAuthContext = createContext<
  Partial<DebtReliefAuthContextProps>
>({});

export const DebtReliefContext = createContext<Partial<DebtReliefContextProps>>(
  {}
);

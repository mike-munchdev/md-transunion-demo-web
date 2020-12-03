import { FC } from 'react';
import { FormikProps } from 'formik';
export { default as AccountCreation } from './AccountCreation';
export { default as Budget } from './Budget';
export { default as Confirm } from './Confirm';
export { default as Creditors } from './Creditors';
export { default as Documents } from './Documents';
export { default as PaymentSetup } from './PaymentSetup';
export { default as PersonalInformation } from './PersonalInformation';
export { default as Welcome } from './Welcome';
export { default as HelpModal } from './HelpModal';
export { default as CreditorModal } from './CreditorModal';
export { default as DebtReliefNavigationControl } from './DebtReliefNavigationControl';

export interface ICreditor {
  id: number;
  creditorId: number;
  name: string;
  accountNumber: string;
  currentApr: number;
  currentPayment: number;
  currentBalance: number;
}
export interface IIncome {
  monthlyNetPay: number;
  coApplicantMonthlyNetPay: number;
  ssnIncome: number;
  retirementPay: number;
  otherGovtBenefits: number;
  childSupport: number;
  allOtherIncome: number;
}
export interface IExpenses {
  monthlyRent: number;
  mortgage: number;
  utilities: number;
  groceries: number;
  automobilePayments: number;
  automobileExpenses: number;
  medical: number;
  insurance: number;
  dayCare: number;
  childSupport: number;
  installmentLoans: number;
  allOther: number;
}

export interface IApplicantInformation {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phoneNumber: string;
  phoneNumberConfirm: string;
  cellPhoneNumber: string;
  faxPhoneNumber: string;
  dobMonth: number;
  dobDay: number;
  dobYear: number;
  ssn: string;
  employer: string;
  occupation: string;
  workPhoneNumber: string;
  maritalStatus: string;
  hardshipReason: string;
}
export interface IDebtReliefStepsProps {
  stepIndex: number;
  steps: IStep[];

  formikProps: FormikProps<IApplication>;
}
export interface IDebtReliefProps {
  formikProps: FormikProps<IApplication>;
}
export interface IApplication {
  applicant: IApplicantInformation;
  coApplicant: IApplicantInformation;
  creditors: ICreditor[];
  income: IIncome;
  expenses: IExpenses;
  bankName: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  bankAccountType: string;
  dayToMakePayment: number;
  secondDayToMakePayment: number;
  monthToStart: number;
  contract: string;
  supportingDocuments: string[];
}

export interface IStep {
  title: string;
  description: string;
  slug: string;
  component: FC<IDebtReliefStepsProps>;
}

import AccountCreation from './AccountCreation';
import Budget from './Budget';
import Confirm from './Confirm';
import Creditors from './Creditors';
import Documents from './Documents';
import PaymentSetup from './PaymentSetup';
import PersonalInformation from './PersonalInformation';
import Welcome from './Welcome';
import { FC } from 'react';
import { FormikProps } from 'formik';

export {
  AccountCreation,
  Budget,
  Confirm,
  Creditors,
  Documents,
  PaymentSetup,
  PersonalInformation,
  Welcome,
};
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
  primaryPhoneNumber: string;
  primaryPhoneNumberConfirm: string;
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
export interface IQuestionnaireStepsProps {
  stepIndex: number;
  steps: IStep[];

  formikProps: FormikProps<IQuestionnaireFormValues>;
}
export interface IQuestionnaireProps {
  formikProps: FormikProps<IQuestionnaireFormValues>;
}
export interface IQuestionnaireFormValues {
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
  component: FC<IQuestionnaireStepsProps>;
}

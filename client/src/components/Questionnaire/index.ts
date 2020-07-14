import AccountCreation from './AccountCreation';
import Budget from './Budget';
import Confirm from './Confirm';
import Creditors from './Creditors';
import Documents from './Documents';
import PaymentSetup from './PaymentSetup';
import PersonalInformation from './PersonalInformation';
import Welcome from './Welcome';
import { FC } from 'react';

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

export interface IQuestionnaireStepsProps {
  currentStepIndex: number;
  steps: IStep[];
  setCurrentStepIndex: Function;
}
export interface IStep {
  title: string;
  description: string;
  slug: string;
  component: FC<IQuestionnaireStepsProps>;
}

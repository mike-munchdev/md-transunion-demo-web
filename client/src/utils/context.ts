import { createContext } from 'react';
import { IApplication } from '../components/Questionnaire';

type DebtReliefContextProps = {
  currentStepIndex: number;
  setCurrentStepIndexContext: (index: number) => void;

  setApplicationContext: (application: IApplication) => void;
  getApplicationContext: () => IApplication | null;
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

export const DebtReliefAuthContext = createContext<
  Partial<DebtReliefAuthContextProps>
>({});

export const DebtReliefContext = createContext<Partial<DebtReliefContextProps>>(
  {}
);

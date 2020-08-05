import { createContext } from 'react';

export const CustomerInfoContext = createContext({
  customerInfo: {
    displayName: '',
    id: '',
  },
  setCustomerInfo: (displayName: string, id: string) => {},
});

export const DebtReliefAuthContext = createContext({
  redirect: (location: string) => {},
  signIn: (token: string, application: any, location?: string) => {},
  signOut: () => {},
  signUp: (message: string) => {},
  isLoggedIn: false,
});

export const DebtReliefContext = createContext({
  currentStepIndex: 0,
  setCurrentStepIndexContext: (index: number) => {},
});

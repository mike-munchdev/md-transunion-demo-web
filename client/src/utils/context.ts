import { createContext } from 'react';

export const CustomerInfoContext = createContext({
  customerInfo: {
    displayName: '',
    id: '',
  },
  setCustomerInfo: (displayName: string, id: string) => {},
});

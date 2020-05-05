import { IError } from './error';

export interface IName {
  unparsed: string;
}
export interface ISubscriber {
  name: IName;
}
export interface IMostRecentPayment {
  date: string;
}
export interface ITuAccount {
  id: string;
  subscriber: ISubscriber;
  currentBalance: number;
  creditLimit: number;
  accountRating: string;
  accountNumber: string;
  mostRecentPayment: IMostRecentPayment;
}
export interface IAccount {
  id: string;
  customerId: string;
  tradeAccounts: [ITuAccount];
  collectionAccounts: [ITuAccount];
}

export interface IAccountsData {
  ok: boolean;
  accounts: IAccount;
  errors: IError[];
}

export interface IAccountDataVars {
  customerId: string;
}

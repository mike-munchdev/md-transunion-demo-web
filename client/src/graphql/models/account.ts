import { IError } from './error';

export interface IAccount {
  id: string;
  creditorName: string;
  balance: number;
  limit: number;
  availableCredit: number;
  accountRating: number;
  accountNumber: string;
  paymentDate: Date;
}

export interface IAccountsData {
  ok: boolean;
  validAccounts: IAccount[];
  invalidAccounts: IAccount[];
  errors: IError[];
}

export interface IAccountDataVars {
  customerId: string;
}

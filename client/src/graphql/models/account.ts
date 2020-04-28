export interface IError {
  message: string;
}

export interface IAccount {
  id: string;
  creditorName: string;
  balance: number;
  limit: number;
  availableCredit: number;
  rating: string;
  acctNumber: string;
  paymentDate: Date;
}

export interface IAccountsData {
  ok: boolean;
  accounts: IAccount[];
  errors: IError[];
}

export interface IAccountDataVars {
  id: number;
}

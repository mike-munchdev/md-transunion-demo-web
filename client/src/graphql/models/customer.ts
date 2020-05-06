export interface ICustomer {
  id: string;
  code?: string;
  email?: string;
  firstName: string;
  middleInit?: string;
  lastName: string;
  suffix?: string;
  phoneNumber: string;
  ssn: string;
  addressNumber?: string;
  addressType?: string;
  addressPostDirection?: string;
  addressPreDirection?: string;
  addressUnit?: string;
  addressStreet?: string;

  city?: string;
  state?: string;
  zipCode?: string;
}

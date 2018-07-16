import { Money } from 'utils/money';

export interface BankAccount {
  id:             number;
  name:           string;
  currency:       string;
  balance:        Money;
  description:    string;
  invoiceDetails: string;
}

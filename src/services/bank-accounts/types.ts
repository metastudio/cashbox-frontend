import { IMoney } from 'utils/money/types';

export interface IBankAccount {
  id:             number;
  name:           string;
  currency:       string;
  balance:        IMoney;
  description:    string;
  invoiceDetails: string;
  visible:        boolean;
}

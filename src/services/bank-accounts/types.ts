import { ID } from 'model-types';
import { IMoney } from 'utils/money/types';

interface IBankAccount {
  id:             ID;
  name:           string;
  currency:       string;
  balance:        IMoney;
  description:    string;
  invoiceDetails: string;
  visible:        boolean;
}

interface IBankAccountParams {
  name?:           string;
  currency?:       string;
  description?:    string;
  invoiceDetails?: string;
  visible?:        boolean;
}

export { IBankAccount, IBankAccountParams };

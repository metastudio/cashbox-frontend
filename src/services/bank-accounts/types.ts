import { ID, Status } from 'model-types';
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

interface IBankAccountState {
  data:   IBankAccount | null;
  status: Status;
  error:  Error | null;
}

interface IBankAccountsState {
  items: IBankAccount[];
  status: Status;
  error:  Error | null;
}

export {
  IBankAccount, IBankAccountParams,
  IBankAccountState, IBankAccountsState,
};

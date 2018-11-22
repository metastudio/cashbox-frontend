import { ID, IPagination, Status } from 'model-types';
import { IMoney } from 'utils/money/types';

import { IBankAccount } from 'services/bank-accounts/types';
import { ICategory } from 'services/categories/types';
import { ICustomer } from 'services/customers/types';

import { IInvoice } from '../invoices';

interface ITransferOut {
  id:          ID;
  amount:      IMoney;
  category:    ICategory;
  bankAccount: IBankAccount;
  date?:       Date;
  comment?:    string;
}

interface ITransaction {
  id:          ID;
  amount:      IMoney;
  category:    ICategory;
  bankAccount: IBankAccount;
  customer?:   ICustomer;
  date?:       Date;
  comment?:    string;
  isViewed:    boolean;
  invoiceId?:  ID;
  invoice?:    IInvoice;
}

interface ITransfer extends ITransaction {
  transferOut: ITransferOut;
}

interface ITransferOutParams {
  id:      ID;
  amount?: string;
}

interface ITransactionParams {
  amount?:        string;
  categoryId?:    number;
  customerId?:    number;
  bankAccountId?: number;
  date?:          string;
  comment?:       string;
  invoiceId?:     number;
  transferOutAttributes?: ITransferOutParams;
}

interface ITransferParams {
  amount?:        string;
  bankAccountId?: number;
  referenceId?:   number;
  exchangeRate?:  string;
  comission?:     string;
  comment?:       string;
  date?:          string;
}

interface ITransactionsState {
  items:      ITransaction[];
  status:     Status;
  error:      Error | null;
  pagination: IPagination | null;
}

interface ITransactionState {
  id:     ID | null;
  item:   ITransaction | null;
  status: Status;
  error:  Error | null;
}

interface ITransactionsFilter {
  amountEq?:        string;
  commentCont?:     string;
  period?:          string;
  categoryIdIn?:    number[];
  bankAccountIdIn?: number[];
  customerIdIn?:    number[];
  dateFrom?:        string;
  dateTo?:          string;
}

export {
  ITransaction, ITransactionParams,
  ITransfer, ITransferParams,
  ITransactionsState, ITransactionState,
  ITransactionsFilter,
};

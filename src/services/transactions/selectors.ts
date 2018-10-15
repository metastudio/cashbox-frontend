import { memoize } from 'lodash';
import { formValueSelector } from 'redux-form';

import { IBankAccount, selectVisibleBankAccountById } from 'services/bank-accounts';
import { IGlobalState } from 'services/global-state';

import { TRANSFER_FORM } from 'constants/forms';
import { parseQuery } from 'utils/url-helpers';

import { ITransactionsFilter } from './types';

const selectTransactions            = (state: IGlobalState) => state.transactions.items;
const selectTransactionsStatus      = (state: IGlobalState) => state.transactions.status;
const selectTransactionsPagination  = (state: IGlobalState) => state.transactions.pagination;

const selectTransaction       = (state: IGlobalState) => state.transaction.item;
const selectTransactionStatus = (state: IGlobalState) => state.transaction.status;

const converValueToArrayNumber = (value?: string | string[]): number[] | undefined => {
  if (!value) { return undefined; }

  if (value instanceof Array) {
    return value.map(Number);
  }

  return [Number(value)];
};

const selectTransactionsQueryFilter = memoize((search: string): ITransactionsFilter => {
  const query = parseQuery(search);

  if (!query.q) { return {}; }

  // tslint:disable:no-string-literal
  return {
    amountEq:        query.q['amountEq'],
    commentCont:     query.q['commentCont'],
    period:          query.q['period'],
    categoryIdIn:    converValueToArrayNumber(query.q['categoryIdIn']),
    bankAccountIdIn: converValueToArrayNumber(query.q['bankAccountIdIn']),
    customerIdIn:    converValueToArrayNumber(query.q['customerIdIn']),
  };
  // tslint:enable:no-string-literal
});

const selectTransactionsQueryPage = memoize((search: string): number | undefined => {
  const page = parseQuery(search).page;
  return page ? Number(page) : undefined;
});

const transferFormSelector = formValueSelector(TRANSFER_FORM);

function selectTransferFormFromBankAccount(state: IGlobalState): IBankAccount | undefined {
  const fromBankAccountId = transferFormSelector(state, 'fromBankAccountId');
  if (!fromBankAccountId) { return undefined; }

  return selectVisibleBankAccountById(state, fromBankAccountId);
}

function selectTransferFormToBankAccount(state: IGlobalState): IBankAccount | undefined {
  const toBankAccountId = transferFormSelector(state, 'toBankAccountId');
  if (!toBankAccountId) { return undefined; }

  return selectVisibleBankAccountById(state, toBankAccountId);
}

export {
  selectTransactions,
  selectTransactionsStatus,
  selectTransactionsPagination,
  selectTransactionsQueryFilter,
  selectTransactionsQueryPage,

  selectTransaction,
  selectTransactionStatus,

  selectTransferFormFromBankAccount,
  selectTransferFormToBankAccount,
};

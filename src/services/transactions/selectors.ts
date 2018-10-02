import { memoize } from 'lodash';

import { IGlobalState } from 'services/global-state';

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
  const values = parseQuery(search).q || {};

  // tslint:disable:no-string-literal
  return {
    amountEq:        values['amountEq'],
    commentCont:     values['commentCont'],
    period:          values['period'],
    categoryIdIn:    converValueToArrayNumber(values['categoryIdIn']),
    bankAccountIdIn: converValueToArrayNumber(values['bankAccountIdIn']),
    customerIdIn:    converValueToArrayNumber(values['customerIdIn']),
  };
  // tslint:enable:no-string-literal
});

const selectTransactionsQueryPage = memoize((search: string): number | undefined => {
  const page = parseQuery(search).page;
  return page ? Number(page) : undefined;
});

export {
  selectTransactions,
  selectTransactionsStatus,
  selectTransactionsPagination,
  selectTransactionsQueryFilter,
  selectTransactionsQueryPage,

  selectTransaction,
  selectTransactionStatus,
};

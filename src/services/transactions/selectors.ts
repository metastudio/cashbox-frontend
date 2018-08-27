import { memoize } from 'lodash';

import { IGlobalState } from 'services/global-state';

import { parseQuery } from 'utils/url-helpers';

import { ITransactionsFilter } from './types';

const selectTransactions            = (state: IGlobalState) => state.transactions.items;
const selectTransactionsStatus      = (state: IGlobalState) => state.transactions.status;
const selectTransactionsPagination  = (state: IGlobalState) => state.transactions.pagination;

const selectTransaction       = (state: IGlobalState) => state.transaction.item;
const selectTransactionStatus = (state: IGlobalState) => state.transaction.status;

const selectTransactionsQueryFilter = memoize((search: string): ITransactionsFilter => {
  return (parseQuery(search).q || {}) as ITransactionsFilter;
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

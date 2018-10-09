import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';
import {
  createTransaction,
  createTransfer,
  destroyTransaction,
  loadTransactions,
  updateTransaction,
} from '../actions';
import { ITransaction, ITransactionsState } from '../types';

const defaultState: ITransactionsState = {
  items:      [],
  status:     Status.Invalid,
  error:      null,
  pagination: null,
};

const transactionsReducer = (
  state: ITransactionsState = defaultState,
  action: ActionType<
    | typeof loadTransactions
    | typeof createTransaction
    | typeof createTransfer
    | typeof updateTransaction
    | typeof destroyTransaction
    | typeof setCurrentOrganization
  >,
): ITransactionsState => {
  switch (action.type) {
    case getType(loadTransactions.request):
      return {
        ...state,
        items:      [],
        status:     Status.Pending,
        error:      null,
        pagination: null,
      };
    case getType(loadTransactions.success):
      return {
        ...state,
        items:      action.payload.transactions,
        status:     Status.Success,
        error:      null,
        pagination: action.payload.pagination,
      };
    case getType(loadTransactions.failure):
      return {
        ...state,
        items:      [],
        status:     Status.Failure,
        error:      action.payload,
        pagination: null,
      };
    case getType(createTransaction.success):
      return {
        ...state,
        items: [action.payload.transaction].concat(state.items),
      };
    case getType(createTransfer.success):
      return {
        ...state,
        items: [action.payload.transfer as ITransaction].concat(state.items),
      };
    case getType(updateTransaction.success):
      return {
        ...state,
        items: state.items.map(t => t.id === action.payload.transaction.id ? action.payload.transaction : t),
      };
    case getType(destroyTransaction.success):
      return {
        ...state,
        items: state.items.filter(t => t.id !== action.payload.transactionId),
      };
    case getType(setCurrentOrganization.success):
      return {
        ...state,
        ...defaultState,
      };
    default:
      return state;
  }
};

export default transactionsReducer;

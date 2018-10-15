import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';
import {
  destroyTransaction,
  loadTransaction,
  updateTransaction,
} from '../actions';
import { ITransactionState } from '../types';

const defaultState: ITransactionState = {
  id:     null,
  item:   null,
  status: Status.Invalid,
  error:  null,
};

const transactionReducer = (
  state: ITransactionState = defaultState,
  action: ActionType<
    | typeof loadTransaction
    | typeof updateTransaction
    | typeof destroyTransaction
    | typeof setCurrentOrganization
  >,
): ITransactionState => {
  switch (action.type) {
    case getType(loadTransaction.request):
      return {
        ...state,
        id:     action.payload.transactionId,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadTransaction.success):
      return {
        ...state,
        status: Status.Success,
        error:  null,
        item:   action.payload.transaction,
      };
    case getType(loadTransaction.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(updateTransaction.success):
      return {
        ...state,
        item: state.id === action.payload.transaction.id ? action.payload.transaction : state.item,
      };
    case getType(destroyTransaction.success):
      return {
        ...state,
        status: state.id === action.payload.transactionId ? Status.Invalid : state.status,
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

export default transactionReducer;

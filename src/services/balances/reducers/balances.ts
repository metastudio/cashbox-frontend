import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';

import { setCurrentOrganization } from 'services/organizations/actions';
import {
  createTransaction,
  createTransfer,
  destroyTransaction,
  updateTransaction,
} from 'services/transactions/actions';

import { loadOrganizationBalances } from '../actions';
import { IBalancesState } from '../types';

const defaultState: IBalancesState = {
  status:          Status.Invalid,
  totalAmount:     null,
  defaultCurrency: null,
  totals:          [],
  error:           null,
};

function balancesReducer(
  state: IBalancesState = defaultState,
  action: ActionType<
    | typeof loadOrganizationBalances
    | typeof createTransaction.success
    | typeof createTransfer.success
    | typeof destroyTransaction.success
    | typeof createTransaction.success
    | typeof updateTransaction.success
    | typeof setCurrentOrganization.success
  >,
): IBalancesState {
  switch (action.type) {
    case getType(loadOrganizationBalances.request):
      return {
        ...state,
        status:          Status.Pending,
        error:           null,
      };
    case getType(loadOrganizationBalances.success):
      return {
        ...state,
        totalAmount:     action.payload.orgBalance.totalAmount,
        defaultCurrency: action.payload.orgBalance.defaultCurrency,
        totals:          action.payload.orgBalance.totals,
        status:          Status.Success,
        error:           null,
      };
    case getType(loadOrganizationBalances.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(createTransaction.success):
    case getType(createTransfer.success):
    case getType(updateTransaction.success):
    case getType(destroyTransaction.success):
      return {
        ...state,
        status: Status.Invalid,
      };
    case getType(setCurrentOrganization.success):
      return {
        ...state,
        ...defaultState,
      };
    default:
      return state;
  }
}

export default balancesReducer;

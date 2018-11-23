import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';
import {
  createTransaction,
  createTransfer,
  destroyTransaction,
  updateTransaction,
} from 'services/transactions';

import {
  createBankAccount,
  deleteBankAccount,
  loadBankAccounts,
  updateBankAccount,
  updateBankAccountPosition,
} from '../actions';
import { IBankAccountsState } from '../types';

const defaultState: IBankAccountsState = {
  items:  [],
  status: Status.Invalid,
  error:  null,
};

function bankAccountsReducer(
  state: IBankAccountsState = defaultState,
  action: ActionType<
    | typeof loadBankAccounts
    | typeof updateBankAccount.success
    | typeof updateBankAccountPosition.success
    | typeof deleteBankAccount.success
    | typeof createBankAccount.success
    | typeof createTransaction.success
    | typeof createTransfer.success
    | typeof updateTransaction.success
    | typeof destroyTransaction.success
    | typeof setCurrentOrganization.success
  >,
): IBankAccountsState {
  switch (action.type) {
    case getType(loadBankAccounts.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadBankAccounts.success):
      return {
        ...state,
        items:  action.payload.bankAccounts,
        status: Status.Success,
        error:  null,
      };
    case getType(loadBankAccounts.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(updateBankAccount.success):
      return {
        ...state,
        items: state.items.map(ba => ba.id === action.payload.bankAccount.id ? action.payload.bankAccount : ba),
      };
    case getType(deleteBankAccount.success):
      return {
        ...state,
        items: state.items.filter(ba => ba.id !== action.payload.bankAccount.id),
      };
    case getType(createBankAccount.success):
    case getType(updateBankAccountPosition.success):
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

export default bankAccountsReducer;

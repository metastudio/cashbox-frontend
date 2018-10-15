import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import { loadBankAccount } from '../actions';
import { IBankAccountState } from '../types';

const defaultState: IBankAccountState = {
  data:   null,
  status: Status.Invalid,
  error:  null,
};

function bankAccountReducer(
  state: IBankAccountState = defaultState,
  action: ActionType<
    | typeof loadBankAccount
    | typeof setCurrentOrganization
  >,
): IBankAccountState {
  switch (action.type) {
    case getType(loadBankAccount.request):
      return {
        ...state,
        data:   null,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadBankAccount.success):
      return {
        ...state,
        data:   action.payload.bankAccount,
        status: Status.Success,
        error:  null,
      };
    case getType(loadBankAccount.failure):
      return {
        ...state,
        data:   null,
        status: Status.Failure,
        error:  action.payload,
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

export default bankAccountReducer;

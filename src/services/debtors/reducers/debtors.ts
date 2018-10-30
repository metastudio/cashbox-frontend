import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { createInvoice, destroyInvoice, updateInvoice } from 'services/invoices/actions';
import { setCurrentOrganization } from 'services/organizations/actions';

import { loadDebtors } from '../actions';
import { IDebtorsState } from '../types';

const defaultState: IDebtorsState = {
  items:            [],
  total:            null,
  totalsByCurrency: [],
  status:           Status.Invalid,
  error:            null,
};

function debtorsReducer(
  state: IDebtorsState = defaultState,
  action: ActionType<
    | typeof loadDebtors
    | typeof createInvoice.success
    | typeof updateInvoice.success
    | typeof destroyInvoice.success
    | typeof setCurrentOrganization.success
  >,
): IDebtorsState {
  switch (action.type) {
    case getType(loadDebtors.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadDebtors.success):
      return {
        ...state,
        items:            action.payload.debtors,
        total:            action.payload.total,
        totalsByCurrency: action.payload.totalsByCurrency,
        status:           Status.Success,
        error:            null,
      };
    case getType(loadDebtors.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(createInvoice.success):
    case getType(updateInvoice.success):
    case getType(destroyInvoice.success):
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

export default debtorsReducer;

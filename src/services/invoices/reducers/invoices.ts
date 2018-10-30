import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import {
  createInvoice,
  destroyInvoice,
  loadInvoices,
  updateInvoice,
} from '../actions';
import { IInvoicesState } from '../types';

const defaultState: IInvoicesState = {
  status:     Status.Invalid,
  items:      [],
  error:      null,
  pagination: null,
};

function invoicesReducer(
  state: IInvoicesState = defaultState,
  action: ActionType<
    | typeof loadInvoices
    | typeof createInvoice.success
    | typeof updateInvoice.success
    | typeof destroyInvoice.success
    | typeof setCurrentOrganization.success
  >,
): IInvoicesState {
  switch (action.type) {
    case getType(loadInvoices.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadInvoices.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        items:      action.payload.invoices,
        pagination: action.payload.pagination,
      };
    case getType(loadInvoices.failure):
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

export default invoicesReducer;

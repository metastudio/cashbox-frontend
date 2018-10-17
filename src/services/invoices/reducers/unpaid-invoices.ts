import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import {
  createInvoice,
  destroyInvoice,
  loadUnpaidInvoices,
  updateInvoice,
} from '../actions';
import { IInvoicesState } from '../types';

const defaultState: IInvoicesState = {
  items:      [],
  status:     Status.Invalid,
  error:      null,
  pagination: null,
};

function unpaidInvoicesReducer(
  state: IInvoicesState = defaultState,
  action: ActionType<
    | typeof loadUnpaidInvoices
    | typeof createInvoice.success
    | typeof updateInvoice.success
    | typeof destroyInvoice.success
    | typeof setCurrentOrganization.success
  >,
): IInvoicesState {
  switch (action.type) {
    case getType(loadUnpaidInvoices.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadUnpaidInvoices.success):
      return {
        ...state,
        status:     Status.Success,
        error:      null,
        items:      action.payload.invoices,
        pagination: action.payload.pagination,
      };
    case getType(loadUnpaidInvoices.failure):
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

export default unpaidInvoicesReducer;

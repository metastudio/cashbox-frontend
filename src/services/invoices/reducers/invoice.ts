import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import { loadInvoice, updateInvoice } from '../actions';
import { IInvoiceState } from '../types';

const defaultState: IInvoiceState = {
  id:     null,
  item:   null,
  status: Status.Invalid,
  error:  null,
};

function invoiceReducer(
  state: IInvoiceState = defaultState,
  action: ActionType<
    | typeof loadInvoice
    | typeof updateInvoice.success
    | typeof setCurrentOrganization.success
  >,
): IInvoiceState {
  switch (action.type) {
    case getType(loadInvoice.request):
      return {
        ...state,
        id:     action.payload.invoiceId,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadInvoice.success):
      return {
        ...state,
        status: Status.Success,
        error:  null,
        item:   action.payload.invoice,
      };
    case getType(loadInvoice.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(updateInvoice.success):
      return {
        ...state,
        item: state.item && state.item.id === action.payload.invoice.id ? action.payload.invoice : state.item,
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

export default invoiceReducer;

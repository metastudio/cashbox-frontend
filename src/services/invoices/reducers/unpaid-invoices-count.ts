import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import {
  createInvoice,
  destroyInvoice,
  loadUnpaidInvoicesCount,
  updateInvoice,
} from '../actions';
import { IUnpaidInvoicesCountState } from '../types';

const defaultState: IUnpaidInvoicesCountState = {
  count:  null,
  status: Status.Invalid,
  error:  null,
};

function unpaidInvoicesCountReducer(
  state: IUnpaidInvoicesCountState = defaultState,
  action: ActionType<
    | typeof loadUnpaidInvoicesCount
    | typeof createInvoice.success
    | typeof updateInvoice.success
    | typeof destroyInvoice.success
    | typeof setCurrentOrganization.success
  >,
): IUnpaidInvoicesCountState {
  switch (action.type) {
    case getType(loadUnpaidInvoicesCount.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadUnpaidInvoicesCount.success):
      return {
        ...state,
        status: Status.Success,
        count:  action.payload.unpaidCount,
      };
    case getType(loadUnpaidInvoicesCount.failure):
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

export default unpaidInvoicesCountReducer;

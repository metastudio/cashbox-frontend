import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import { loadCustomer } from '../actions';
import { ICustomerState } from '../types';

const defaultState: ICustomerState = {
  data:   null,
  status: Status.Invalid,
  error:  null,
};

function customerReducer(
  state: ICustomerState = defaultState,
  action: ActionType<
    | typeof loadCustomer
    | typeof setCurrentOrganization.success
  >,
): ICustomerState {
  switch (action.type) {
    case getType(loadCustomer.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadCustomer.success):
      return {
        ...state,
        data:   action.payload.customer,
        status: Status.Success,
        error:  null,
      };
    case getType(loadCustomer.failure):
      return {
        ...state,
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

export default customerReducer;

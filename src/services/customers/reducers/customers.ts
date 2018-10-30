import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { setCurrentOrganization } from 'services/organizations/actions';

import {
  createCustomer,
  deleteCustomer,
  loadCustomers,
  updateCustomer,
} from '../actions';
import { ICustomersState } from '../types';

const defaultState: ICustomersState = {
  items:  [],
  status: Status.Invalid,
  error:  null,
};

function customersReducer(
  state: ICustomersState = defaultState,
  action: ActionType<
    | typeof loadCustomers
    | typeof createCustomer.success
    | typeof updateCustomer.success
    | typeof deleteCustomer.success
    | typeof setCurrentOrganization.success
  >,
): ICustomersState {
  switch (action.type) {
    case getType(loadCustomers.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadCustomers.success):
      return {
        ...state,
        items:  action.payload.customers,
        status: Status.Success,
        error:  null,
      };
    case getType(loadCustomers.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(createCustomer.success):
      return {
        ...state,
        status: Status.Invalid,
      };
    case getType(updateCustomer.success):
      return {
        ...state,
        items:  state.items.map(c => c.id === action.payload.customer.id ? action.payload.customer : c),
      };
    case getType(deleteCustomer.success):
      return {
        ...state,
        items:  state.items.filter(c => c.id !== action.payload.customer.id),
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

export default customersReducer;

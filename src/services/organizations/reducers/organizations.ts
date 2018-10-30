import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import {
  createOrganization,
  destroyOrganization,
  loadOrganizations,
  updateOrganization,
} from '../actions';
import { IOrganizationsState } from '../types';

const defaultState: IOrganizationsState = {
  items:  [],
  status: Status.Invalid,
  error:  null,
};

const organizationsReducer = (
  state: IOrganizationsState = defaultState,
  action: ActionType<
    | typeof loadOrganizations
    | typeof updateOrganization
    | typeof destroyOrganization
    | typeof createOrganization
  >,
): IOrganizationsState => {
  switch (action.type) {
    case getType(loadOrganizations.request):
      return {
        ...state,
        items:  [],
        status: Status.Pending,
        error:  null,
      };
    case getType(loadOrganizations.success):
      return {
        ...state,
        items:  action.payload.orgs,
        status: Status.Success,
        error:  null,
      };
    case getType(loadOrganizations.failure):
      return {
        ...state,
        items:  [],
        status: Status.Failure,
        error:  action.payload,
      };
    case getType(updateOrganization.success):
      return {
        ...state,
        items: state.items.map(o => o.id === action.payload.org.id ? action.payload.org : o),
      };
    case getType(destroyOrganization.success):
      return {
        ...state,
        items: state.items.filter(o => o.id !== action.payload.org.id),
      };
    case getType(createOrganization.success):
      return {
        ...state,
        status: Status.Invalid,
      };
    default:
      return state;
  }
};

export default organizationsReducer;

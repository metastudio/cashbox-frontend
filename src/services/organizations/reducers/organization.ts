import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { loadOrganization } from '../actions';
import { IOrganizationState } from '../types';

const defaultState: IOrganizationState = {
  data:   null,
  status: Status.Invalid,
  error:  null,
};

const organizationReducer = (
  state: IOrganizationState = defaultState,
  action: ActionType<
    | typeof loadOrganization
  >,
): IOrganizationState => {
  switch (action.type) {
    case getType(loadOrganization.request):
      return {
        ...state,
        data:   null,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadOrganization.success):
      return {
        ...state,
        data:   action.payload.org,
        status: Status.Success,
        error:  null,
      };
    case getType(loadOrganization.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    default:
      return state;
  }
};

export default organizationReducer;

import { ActionType, getType } from 'typesafe-actions';

import {
  restoreOrganization,
  setCurrentOrganization,
} from '../actions';
import { ICurrentOrganizationState } from '../types';

const defaultState: ICurrentOrganizationState = {
  id:       null,
  data:     null,
  isLoaded: false,
};

const currentOrganizationReducer = (
  state: ICurrentOrganizationState = defaultState,
  action: ActionType<
    | typeof restoreOrganization
    | typeof setCurrentOrganization
  >,
): ICurrentOrganizationState => {
  switch (action.type) {
    case getType(restoreOrganization.request):
      return {
        ...state,
        id:       null,
        data:     null,
        isLoaded: false,
      };
    case getType(setCurrentOrganization.success):
    case getType(restoreOrganization.success):
      return {
        ...state,
        id:       action.payload.org.id,
        data:     action.payload.org,
        isLoaded: true,
      };
    case getType(restoreOrganization.failure):
      return {
        ...state,
        isLoaded: true,
      };
    default:
      return state;
  }
};

export default currentOrganizationReducer;

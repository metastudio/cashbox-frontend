import { ActionType, getType } from 'typesafe-actions';

import { restoreSession } from 'services/auth';

import { IAppState } from '../types';

const defaultState: IAppState = {
  isSessionLoaded: false,
};

function appReducer(
  state: IAppState = defaultState,
  action: ActionType<
    | typeof restoreSession
  >,
): IAppState {
  switch (action.type) {
    case getType(restoreSession.request):
      return {
        ...state,
        isSessionLoaded: false,
      };
    case getType(restoreSession.success):
      return {
        ...state,
        isSessionLoaded: true,
      };
    case getType(restoreSession.failure):
      return {
        ...state,
        isSessionLoaded: true,
      };
    default:
      return state;
  }
}

export default appReducer;

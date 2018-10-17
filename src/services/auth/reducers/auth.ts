import { ActionType, getType } from 'typesafe-actions';

import {
  cancelAccount,
  updateAccount,
  updateProfile,
} from 'services/users';

import {
  loginUser,
  logoutUser,
  restoreSession,
} from '../actions';
import { IAuthState } from '../types';

const defaultState: IAuthState = {
  token: null,
  user:  null,
};

function authReducer(
  state: IAuthState = defaultState,
  action: ActionType<
    | typeof restoreSession
    | typeof loginUser
    | typeof logoutUser.success
    | typeof updateProfile.success
    | typeof updateAccount.success
    | typeof cancelAccount.success
  >,
): IAuthState {
  switch (action.type) {
    case getType(restoreSession.request):
    case getType(loginUser.request):
      return {
        ...state,
        token: null,
        user:  null,
      };
    case getType(restoreSession.success):
    case getType(loginUser.success):
      return {
        ...state,
        token: action.payload.token,
        user:  action.payload.user,
      };
    case getType(restoreSession.failure):
    case getType(loginUser.failure):
      return {
        ...state,
        token: null,
        user:  null,
      };
    case getType(logoutUser.success):
    case getType(cancelAccount.success):
      return {
        ...state,
        token: null,
        user:  null,
      };
    case getType(updateProfile.success):
    case getType(updateAccount.success):
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}

export default authReducer;

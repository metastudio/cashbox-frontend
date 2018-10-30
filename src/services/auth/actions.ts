import { noop } from 'lodash';
import { createAction } from 'typesafe-actions';

import { IUser } from 'services/users/types';

const loginUser = {
  request: createAction(
    'LOGIN_USER_REQUEST',
    (res) => {
      return (
        email:    string | undefined,
        password: string | undefined,
        resolve:  (() => void)  = noop,
        reject:   ((error: Error) => void) = noop,
      ) => res(
        { email, password },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'LOGIN_USER_SUCCESS',
    (resolve) => {
      return (email: string, token: string, user: IUser) => resolve({ email, token, user });
    },
  ),
  failure: createAction(
    'LOGIN_USER_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const restoreSession = {
  request: createAction('RESTORE_SESSION_REQUEST'),
  success: createAction(
    'RESTORE_SESSION_SUCCESS',
    (resolve) => {
      return (token: string, user: IUser) => resolve({ token, user });
    },
  ),
  failure: createAction(
    'RESTORE_SESSION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const logoutUser = {
  request: createAction(
    'LOGOUT_USER',
    (res) => {
      return (
        resolve:  (() => void)  = noop,
        reject:   ((error: Error) => void) = noop,
      ) => res(
        undefined,
        { resolve, reject },
      );
    },
  ),
  success: createAction('LOGOUT_USER_SUCCESS'),
};

export {
  loginUser,
  restoreSession,
  logoutUser,
};

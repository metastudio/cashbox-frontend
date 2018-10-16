import { noop } from 'lodash';
import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';

import { IUser, IUserAccountParams, IUserProfileParams } from './types';

const updateProfile = {
  request: createAction(
    'UPDATE_PROFILE_REQUEST',
    (res) => {
      return (
        userId:  ID,
        data:    IUserProfileParams,
        resolve: ((user: IUser) => void)  = noop,
        reject:  ((error: Error) => void) = noop,
      ) => res(
        { userId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'UPDATE_PROFILE_SUCCESS',
    (resolve) => {
      return (user: IUser) => resolve({ user });
    },
  ),
  failure: createAction(
    'UPDATE_PROFILE_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const updateAccount = {
  request: createAction(
    'UPDATE_ACCOUNT_REQUEST',
    (res) => {
      return (
        userId:  ID,
        data:    IUserAccountParams,
        resolve: ((user: IUser) => void)  = noop,
        reject:  ((error: Error) => void) = noop,
      ) => res(
        { userId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'UPDATE_ACCOUNT_SUCCESS',
    (resolve) => {
      return (user: IUser) => resolve({ user });
    },
  ),
  failure: createAction(
    'UPDATE_ACCOUNT_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const cancelAccount = {
  request: createAction(
    'CANCEL_ACCOUNT_REQUEST',
    (res) => {
      return (
        userId:  ID,
        resolve: (() => void)             = noop,
        reject:  ((error: Error) => void) = noop,
      ) => res(
        { userId },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'CANCEL_ACCOUNT_SUCCESS',
  ),
  failure: createAction(
    'CANCEL_ACCOUNT_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  updateProfile,
  updateAccount,
  cancelAccount,
};

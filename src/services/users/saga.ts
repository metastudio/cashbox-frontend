import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { deleteUser, putProfile, putUser } from './api';

import {
  cancelAccount,
  updateAccount,
  updateProfile,
} from './actions';

export function* handleUpdateProfile(
  {
    payload: { userId, data },
    meta: { resolve, reject },
  }: ActionType<typeof updateProfile.request>,
) {
  try {
    const user = yield call(putProfile, userId, data);
    yield put(updateProfile.success(user));
    yield call(resolve, user);
  } catch (error) {
    yield call(reject, error);
  }
}

export function* handleUpdateAccount(
  {
    payload: { userId, data },
    meta: { resolve, reject },
  }: ActionType<typeof updateAccount.request>,
) {
  try {
    const user = yield call(putUser, userId, data);
    yield put(updateAccount.success(user));
    yield call(resolve, user);
  } catch (error) {
    yield call(reject, error);
  }
}

export function* handleCancelAccount(
  {
    payload: { userId },
    meta: { resolve, reject },
  }: ActionType<typeof cancelAccount.request>,
) {
  try {
    yield call(deleteUser, userId);
    yield put(cancelAccount.success());
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

export default function* () {
  yield takeEvery(getType(updateProfile.request), handleUpdateProfile);
  yield takeEvery(getType(updateAccount.request), handleUpdateAccount);
  yield takeEvery(getType(cancelAccount.request), handleCancelAccount);
}

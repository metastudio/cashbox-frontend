import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { loadMembers, updateMemberLastVisit } from './actions';
import { getOrganizationMembers, putMemberLastVisit } from './api';

function* handleLoadMembers(
  { payload: { orgId } }: ActionType<typeof loadMembers.request>,
) {
  try {
    const members = yield call(getOrganizationMembers, orgId);
    yield put(loadMembers.success(orgId, members));
  } catch (error) {
    yield put(loadMembers.failure(error));
  }
}

function* handleUpdateMemberLastVisit(
  { payload: { orgId } }: ActionType<typeof updateMemberLastVisit.request>,
) {
  try {
    const member = yield call(putMemberLastVisit, orgId);
    yield put(updateMemberLastVisit.success(orgId, member));
  } catch (error) {
    yield put(updateMemberLastVisit.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadMembers.request),           handleLoadMembers);
  yield takeLatest(getType(updateMemberLastVisit.request), handleUpdateMemberLastVisit);
}

import { takeLatest, call, put } from 'redux-saga/effects';

import { getOrganizationMembers, putMemberLastVisit } from './api.js';

import { loadMembers, updateMemberLastVisit } from './actions.js';

function* handleLoadMembers({ payload: { organizationId } }) {
  try {
    yield put(loadMembers.request(organizationId));
    const members = yield call(getOrganizationMembers, organizationId);
    yield put(loadMembers.success(organizationId, members));
  } catch (error) {
    yield put(loadMembers.failure(error));
  }
}

function* handleUpdateMemberLastVisit({ payload: { organizationId } }) {
  try {
    yield put(updateMemberLastVisit.request(organizationId));
    const member = yield call(putMemberLastVisit, organizationId);
    yield put(updateMemberLastVisit.success(organizationId, member));
  } catch (error) {
    yield put(updateMemberLastVisit.failure(error));
  }
}

export default function* () {
  yield takeLatest(loadMembers,           handleLoadMembers);
  yield takeLatest(updateMemberLastVisit, handleUpdateMemberLastVisit);
}

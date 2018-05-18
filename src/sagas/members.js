import { takeEvery, call, put } from 'redux-saga/effects';

import { getOrganizationMembers, getCurrentMember } from 'api/members.js';

import { loadMembers, loadCurrentMember } from 'actions/members.js';

function* handleLoadMembers({ payload: { organizationId } }) {
  try {
    yield put(loadMembers.request(organizationId));
    const members = yield call(getOrganizationMembers, organizationId);
    yield put(loadMembers.success(organizationId, members));
  } catch (error) {
    yield put(loadMembers.failure(error));
  }
}

function* handleGetCurrentMember({ payload: { organizationId } }) {
  try {
    yield put(loadCurrentMember.request(organizationId));
    const member = yield call(getCurrentMember, organizationId);
    yield put(loadCurrentMember.success(organizationId, member));
  } catch (error) {
    yield put(loadCurrentMember.failure(error));
  }
}

export default function* () {
  yield takeEvery(loadMembers,       handleLoadMembers);
  yield takeEvery(loadCurrentMember, handleGetCurrentMember);
}

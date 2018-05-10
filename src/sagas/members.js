import { takeEvery, call, put } from 'redux-saga/effects';

import { getOrganizationMembers, getCurrentMember, putMemberLastViewedAt } from 'api/members.js';

import { loadMembers, loadCurrentMember, updateMemberLastViewedAt } from 'actions/members.js';

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

function* handleUpdateMemberLastViewedAt({ payload: { organizationId, memberId }, meta: { resolve, reject } }) {
  try {
    yield put(updateMemberLastViewedAt.request(organizationId, memberId));
    const member = yield call(putMemberLastViewedAt, organizationId, memberId);
    yield put(updateMemberLastViewedAt.success(organizationId, memberId, member));
    yield call(resolve, member);
  } catch (error) {
    yield put(updateMemberLastViewedAt.failure(error));
    yield call(reject, error);
  }
}

export default function* () {
  yield takeEvery(loadMembers,              handleLoadMembers);
  yield takeEvery(loadCurrentMember,        handleGetCurrentMember);
  yield takeEvery(updateMemberLastViewedAt, handleUpdateMemberLastViewedAt);
}

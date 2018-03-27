import { takeEvery, call, put } from 'redux-saga/effects'

import { ValidationError } from 'api/errors.js'
import { getOrganizationMembers } from 'api/index.js'

import { loadMembers } from 'actions/members.js'

function* handleLoadMembers({ payload: { organizationId }}) {
  try {
    yield put(loadMembers.request(organizationId))
    const members = yield call(getOrganizationMembers, organizationId)
    yield put(loadMembers.success(organizationId, members))
  } catch (error) {
    yield put(loadMembers.failure(error))
  }
}

export default function* () {
  yield takeEvery(loadMembers.toString(),  handleLoadMembers)
}

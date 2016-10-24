import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { ValidationError } from 'api/errors'
import { getOrganizationMembers } from 'api'

import { loadMembers } from 'actions'

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

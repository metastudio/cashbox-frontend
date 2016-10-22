import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { setCookies } from 'utils/cookies'

import { ValidationError } from 'api/errors'
import { getOrganizations, postOrganization } from 'api'

import {
  loadOrganizations,
  createOrganization,
  setCurrentOrganization,
} from 'actions'

function* handleLoadOrganizations() {
  try {
    yield put(loadOrganizations.request())
    const organizations = yield call(getOrganizations)
    yield put(loadOrganizations.success(organizations))
  } catch (error) {
    yield put(loadOrganizations.failure(error))
  }
}

function* handleCreateOrganization({ payload: { data }, meta: { resolve, reject } }) {
  try {
    yield put(createOrganization.request())
    const organization = yield call(postOrganization, data)
    yield put(createOrganization.success(organization))
    yield call(resolve, organization)
  } catch (error) {
    yield put(createOrganization.failure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

function* handleSetCurrentOrganization({ payload: { organization }, meta: { resolve }}) {
  setCookies({ currentOrganizationId: organization.id })
  yield put(setCurrentOrganization.success(organization))
  yield call(resolve, organization)
}

export default function* () {
  yield takeEvery(loadOrganizations.toString(),      handleLoadOrganizations)
  yield takeEvery(createOrganization.toString(),     handleCreateOrganization)
  yield takeEvery(setCurrentOrganization.toString(), handleSetCurrentOrganization)
}



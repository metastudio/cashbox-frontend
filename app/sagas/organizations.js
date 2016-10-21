import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { setCookies } from 'utils/cookies'

import { ValidationError } from 'api/errors'
import { getOrganizations, getOrganization, postOrganization } from 'api'

import {
  loadOrganizations,          loadOrganizationsRequest,          loadOrganizationsSuccess,          loadOrganizationsFailure,
  loadOrganization,           loadOrganizationRequest,           loadOrganizationSuccess,           loadOrganizationFailure,
  createOrganization,         createOrganizationRequest,         createOrganizationSuccess,         createOrganizationFailure,
  setCurrentOrganization,     setCurrentOrganizationSuccess,
} from 'actions'

function* handleLoadOrganizations() {
  try {
    yield put(loadOrganizationsRequest())
    const organizations = yield call(getOrganizations)
    yield put(loadOrganizationsSuccess(organizations))
  } catch (error) {
    yield put(loadOrganizationsFailure(error))
  }
}

function* handleLoadOrganization({ payload: { organizationId } }) {
  try {
    yield put(loadOrganizationRequest(organizationId))
    const organization = yield call(getOrganization, organizationId)
    yield put(loadOrganizationSuccess(organizationId, organization))
  } catch (error) {
    yield put(loadOrganizationFailure(error))
  }
}

function* handleCreateOrganization({ payload: { data }, meta: { resolve, reject } }) {
  try {
    yield put(createOrganizationRequest())
    const organization = yield call(postOrganization, data)
    yield put(createOrganizationSuccess(organization))
    yield call(resolve, organization)
  } catch (error) {
    yield put(createOrganizationFailure(error))
    const errors = error instanceof ValidationError ? error.errors : { _error: error.message }
    yield call(reject, errors)
  }
}

function* handleSetCurrentOrganization({ payload: { organization }, meta: { resolve }}) {
  setCookies({ currentOrganizationId: organization.id })
  yield put(setCurrentOrganizationSuccess(organization))
  yield call(resolve, organization)
}

export default function* () {
  yield takeEvery(loadOrganizations.toString(),          handleLoadOrganizations)
  yield takeEvery(loadOrganization.toString(),           handleLoadOrganization)
  yield takeEvery(createOrganization.toString(),         handleCreateOrganization)
  yield takeEvery(setCurrentOrganization.toString(),     handleSetCurrentOrganization)
}



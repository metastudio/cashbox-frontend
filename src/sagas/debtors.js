import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import {
  getDebtors,
} from 'api/debtors.js';

import {
  loadDebtors
} from 'actions/debtors.js';

function* handleLoadDebtors({ payload: { organizationId } }) {
  try {
    yield put(loadDebtors.request(organizationId));
    const debtors = yield call(getDebtors, organizationId);
    yield put(loadDebtors.success(organizationId, debtors));
  } catch (error) {
    yield put(loadDebtors.failure(error));
  }
}

export default function* () {
  yield takeEvery(loadDebtors.toString(), handleLoadDebtors);
}

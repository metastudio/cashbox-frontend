import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { loadCurrencies } from './actions';
import { getCurrencies } from './api';

function* handleLoadCurrencies() {
  try {
    const currencies = yield call(getCurrencies);
    yield put(loadCurrencies.success(currencies));
  } catch (error) {
    yield put(loadCurrencies.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadCurrencies.request), handleLoadCurrencies);
}

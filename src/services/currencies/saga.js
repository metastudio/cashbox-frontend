import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import { getCurrencies } from './api.js';
import { loadCurrencies } from './actions.js';

function* handleLoadCurrencies() {
  try {
    yield put(loadCurrencies.request());
    const currencies = yield call(getCurrencies);
    yield put(loadCurrencies.success(currencies));
  } catch (error) {
    yield put(loadCurrencies.failure(error));
  }
}

export default function* () {
  yield takeLatest(loadCurrencies, handleLoadCurrencies);
}

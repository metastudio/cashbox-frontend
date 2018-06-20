import { takeEvery, call, put } from 'redux-saga/effects';

import { getCurrencyRates } from 'api/currencies.js';
import { loadCurrenciesRates } from 'actions/currencies.js';

function* handleLoadCurrenciesRates() {
  try {
    yield put(loadCurrenciesRates.request());
    const rates = yield call(getCurrencyRates);
    yield put(loadCurrenciesRates.success(rates));
  } catch (error) {
    yield put(loadCurrenciesRates.failure(error));
  }
}

export default function* () {
  yield takeEvery(loadCurrenciesRates.toString(), handleLoadCurrenciesRates);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import {
  loadDebtors,
} from 'services/debtors/actions';
import {
  getDebtors,
} from 'services/debtors/api';

function* handleLoadDebtors(
  { payload: { orgId } }: ActionType<typeof loadDebtors.request>,
) {
  try {
    const { debtors, total, totalsByCurrency } = yield call(getDebtors, orgId);
    yield put(loadDebtors.success(orgId, debtors, total, totalsByCurrency));
  } catch (error) {
    yield put(loadDebtors.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(loadDebtors.request), handleLoadDebtors);
}

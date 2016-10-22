import { fork } from 'redux-saga/effects'

import authSaga          from './auth'
import balancesSaga      from './balances'
import bankAccountsSaga  from './bank-accounts'
import organizationsSaga from './organizations'

export default function* rootSaga() {
  yield [
    fork(authSaga),
    fork(balancesSaga),
    fork(bankAccountsSaga),
    fork(organizationsSaga),
  ]
}

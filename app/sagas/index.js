import { fork } from 'redux-saga/effects'

import authSaga          from './auth'
import balancesSaga      from './balances'
import bankAccountsSaga  from './bank-accounts'
import organizationsSaga from './organizations'
import transactionsSaga  from './transactions'
import usersSaga         from './users'

export default function* rootSaga() {
  yield [
    fork(authSaga),
    fork(balancesSaga),
    fork(bankAccountsSaga),
    fork(organizationsSaga),
    fork(transactionsSaga),
    fork(usersSaga)
  ]
}

import { fork, all } from 'redux-saga/effects';

import authSaga          from 'services/auth/saga.js';
import balancesSaga      from './balances';
import bankAccountsSaga  from 'services/bank-accounts/saga.js';
import organizationsSaga from './organizations';
import transactionsSaga  from './transactions';
import customersSaga     from 'services/customers/saga.js';
import categoriesSaga    from 'services/categories/saga.js';
import membersSaga       from './members';
import usersSaga         from './users';
import invoicesSaga      from 'services/invoices/saga.js';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(balancesSaga),
    fork(bankAccountsSaga),
    fork(organizationsSaga),
    fork(transactionsSaga),
    fork(customersSaga),
    fork(categoriesSaga),
    fork(membersSaga),
    fork(usersSaga),
    fork(invoicesSaga)
  ]);
}

export default rootSaga;

import { fork, all } from 'redux-saga/effects';

import authSaga          from './auth/saga.js';
import balancesSaga      from './balances/saga.js';
import bankAccountsSaga  from './bank-accounts/saga.js';
import categoriesSaga    from './categories/saga.js';
import currenciesSaga    from './currencies/saga.js';
import customersSaga     from './customers/saga.js';
import invoicesSaga      from './invoices/saga.js';
import membersSaga       from './members/saga.js';
import organizationsSaga from './organizations/saga.js';
import transactionsSaga  from './transactions/saga.js';
import usersSaga         from './users/saga.js';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(balancesSaga),
    fork(bankAccountsSaga),
    fork(organizationsSaga),
    fork(transactionsSaga),
    fork(currenciesSaga),
    fork(customersSaga),
    fork(categoriesSaga),
    fork(membersSaga),
    fork(usersSaga),
    fork(invoicesSaga)
  ]);
}

export default rootSaga;

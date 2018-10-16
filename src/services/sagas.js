import { fork, all } from 'redux-saga/effects';

import authSaga                from './auth/saga.js';
import balancesSaga            from './balances/saga.js';
import bankAccountsSaga        from './bank-accounts/saga';
import categoriesSaga          from './categories/saga.js';
import currenciesSaga          from './currencies/saga.js';
import customersSaga           from './customers/saga.js';
import debtorsSaga             from './debtors/saga.js';
import invoicesSaga            from './invoices/saga.js';
import membersSaga             from './members/saga.js';
import organizationsSaga       from './organizations/saga';
import transactionsSaga        from './transactions/saga';
import transactionsSummarySaga from './transactions-summary/saga';
import usersSaga               from './users/saga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(balancesSaga),
    fork(bankAccountsSaga),
    fork(organizationsSaga),
    fork(currenciesSaga),
    fork(customersSaga),
    fork(categoriesSaga),
    fork(debtorsSaga),
    fork(invoicesSaga),
    fork(membersSaga),
    fork(transactionsSaga),
    fork(transactionsSummarySaga),
    fork(usersSaga),
  ]);
}

export default rootSaga;

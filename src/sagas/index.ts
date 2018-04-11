import { fork, all } from 'redux-saga/effects';

import authSaga          from './auth';
import balancesSaga      from './balances';
import bankAccountsSaga  from './bank-accounts';
import organizationsSaga from './organizations';
import transactionsSaga  from './transactions';
import customersSaga     from './customers';
import categoriesSaga    from './categories';
import membersSaga       from './members';
import usersSaga         from './users';
import invoicesSaga      from './invoices';

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

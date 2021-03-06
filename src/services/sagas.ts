import { all, fork } from 'redux-saga/effects';

import authSaga                from './auth/saga';
import balancesSaga            from './balances/saga';
import bankAccountsSaga        from './bank-accounts/saga';
import categoriesSaga          from './categories/saga';
import currenciesSaga          from './currencies/saga';
import customersSaga           from './customers/saga';
import debtorsSaga             from './debtors/saga';
import invoicesSaga            from './invoices/saga';
import membersSaga             from './members/saga';
import organizationsSaga       from './organizations/saga';
import statisticSaga           from './statistic/saga';
import transactionsSummarySaga from './transactions-summary/saga';
import transactionsSaga        from './transactions/saga';
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
    fork(statisticSaga),
    fork(transactionsSummarySaga),
    fork(transactionsSaga),
    fork(usersSaga),
  ]);
}

export default rootSaga;

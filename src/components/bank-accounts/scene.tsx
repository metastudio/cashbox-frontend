import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import AppLayout from 'components/layouts/app-layout';

import List from './list.jsx';
import New  from './new.jsx';
import Edit from './edit.jsx';

const BankAccountsScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      <Route exact path="/bank_accounts" component={ List } />
      <Route path="/bank_accounts/new" component={ New } />
      <Route path="/bank_accounts/:bankAccountId/edit" component={ Edit } />
    </AppLayout>
  </RequireLogin>
);

export default BankAccountsScene;

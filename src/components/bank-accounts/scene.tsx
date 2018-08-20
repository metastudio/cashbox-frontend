import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import { CurrentOrganizationProvider } from 'components/organizations/current-organization';
import AppLayout from 'components/layouts/app-layout';

import List from './list';
import New  from './new';
import Edit from './edit';

const BankAccountsScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <CurrentOrganizationProvider>
      <AppLayout>
        <Route exact path="/bank_accounts" component={ List } />
        <Route path="/bank_accounts/new" component={ New } />
        <Route path="/bank_accounts/:id/edit" component={ Edit } />
      </AppLayout>
    </CurrentOrganizationProvider>
  </RequireLogin>
);

export default BankAccountsScene;

import * as React from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Route } from 'react-router-dom';

import AppLayout from 'components/layouts/app-layout';
import { CurrentOrganizationProvider } from 'components/organizations/current-organization';
import RequireLogin from 'components/utils/require-login';

import Edit from './edit';
import List from './list';
import New  from './new';

const BankAccountsScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <CurrentOrganizationProvider>
      <AppLayout>
        <BreadcrumbsItem to={ '/bank_accounts' }>
          Bank Accounts
        </BreadcrumbsItem>
        <Route exact path="/bank_accounts" component={ List } />
        <Route path="/bank_accounts/new" component={ New } />
        <Route path="/bank_accounts/:id/edit" component={ Edit } />
      </AppLayout>
    </CurrentOrganizationProvider>
  </RequireLogin>
);

export default BankAccountsScene;

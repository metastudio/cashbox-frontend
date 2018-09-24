import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from 'components/layouts/main-layout';
import { CurrentOrganizationProvider } from 'components/organizations/current-organization';
import RequireLogin from 'components/utils/require-login';

import Edit from './edit';
import List from './list';
import New  from './new';
import Show from './show';

const TransactionsScene: React.SFC<{}> = () => (
  <RequireLogin>
    <CurrentOrganizationProvider>
      <MainLayout>
        <Switch>
          <Route exact path="/transactions/new" component={ New } />
          <Route exact path="/transactions/:id" component={ Show } />
          <Route exact path="/transactions/:id/edit" component={ Edit } />
        </Switch>
        <List />
      </MainLayout>
    </CurrentOrganizationProvider>
  </RequireLogin>
);

export default TransactionsScene;

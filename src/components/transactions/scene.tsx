import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import List from './list';
import New  from './new';
import Edit from './edit';

const TransactionsScene: React.SFC<{}> = () => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <Switch>
          <Route exact path="/transactions/new" component={ New } />
          <Route exact path="/transactions/:id/edit" component={ Edit } />
        </Switch>
        <PageHeader>
          <Link to="/transactions/new" className="btn btn-default pull-right">New Transaction...</Link>
          Transactions
        </PageHeader>
        <List />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default TransactionsScene;

import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import MainLayout from 'components/layouts/main-layout';
import RequireOrganization from 'components/require-organization';
import RequireLogin from 'components/utils/require-login';

import Sidebar from './debtors-sidebar';
import Edit from './edit';
import List from './list';
import New from './new';
import Show from './show';

const InvoicesScene: React.SFC<{}> = () => (
  // tslint:disable:jsx-no-lambda
  <RequireLogin>
    <RequireOrganization>
      <MainLayout sidebar={ () => <Sidebar /> } >
        <Switch>
          <Route exact path="/invoices" component={ List } />
          <Route exact path="/invoices/unpaid" component={ List } />
          <Route path="/invoices/new" component={ New } />
          <Route exact path="/invoices/:id" component={ Show } />
          <Route exact path="/invoices/:id/complete" component={ Show } />
          <Route path="/invoices/:id/edit" component={ Edit } />
        </Switch>
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
  // tslint:enable:jsx-no-lambda
);

export default InvoicesScene;

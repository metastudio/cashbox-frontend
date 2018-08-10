import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import Sidebar from './debtors-sidebar';
import List from './list';
import New from './new';
import Show from './show';
import Edit from './edit';

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
          <Route path="/invoices/:id/edit" component={ Edit } />
        </Switch>
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
  // tslint:enable:jsx-no-lambda
);

export default InvoicesScene;

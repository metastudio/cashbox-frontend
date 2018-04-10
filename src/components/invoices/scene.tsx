import * as React from 'react';
import { Route, Switch } from 'react-router';

import RequireLogin from 'components/utils/require-login';
import MainLayout from 'components/layouts/main-layout';

import List from './list';
import New from './new';
import Show from './show';
import Edit from './edit';

const InvoicesScene: React.SFC<{}> = () => (
  <RequireLogin>
    <MainLayout>
      <Switch>
        <Route exact path="/invoices" component={ List } />
        <Route path="/invoices/new" component={ New } />
        <Route exact path="/invoices/:id" component={ Show } />
        <Route path="/invoices/:id/edit" component={ Edit } />
      </Switch>
    </MainLayout>
  </RequireLogin>
);

export default InvoicesScene;

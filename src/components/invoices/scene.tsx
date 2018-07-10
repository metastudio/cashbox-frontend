import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import Layout from 'components/layouts/main-layout';
import Sidebar from 'components/layouts/debtors-sidebar';

import List from './list';
import New from './new';
import Show from './show';
import Edit from './edit';

const InvoicesScene: React.SFC<{}> = () => (
  <RequireLogin>
    <Layout sidebar={ <Sidebar /> } >
      <Switch>
        <Route exact path="/invoices" component={ List } />
        <Route exact path="/invoices/unpaid" component={ List } />
        <Route path="/invoices/new" component={ New } />
        <Route exact path="/invoices/:id" component={ Show } />
        <Route path="/invoices/:id/edit" component={ Edit } />
      </Switch>
    </Layout>
  </RequireLogin>
);

export default InvoicesScene;

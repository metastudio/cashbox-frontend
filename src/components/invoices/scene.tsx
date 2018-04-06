import * as React from 'react';
import { Route, Redirect } from 'react-router';

import RequireLogin from 'components/utils/require-login';
import MainLayout from 'components/layouts/main-layout';

import List from './list.jsx';
import New from './new.jsx';
import Show from './show.jsx';
import Edit from './edit.jsx';

const InvoicesScene: React.SFC<{}> = () => (
  <RequireLogin>
    <MainLayout>
      <Route exact path="/invoices" render={ () => <Redirect to="/invoices/list" /> } />
      <Route path="/invoices/list" component={ List } />
      <Route path="/invoices/new" component={ New } />
      <Route path="/invoices/:id/edit" component={ Edit } />
      <Route exact path="/invoices/:id" component={ Show } />
    </MainLayout>
  </RequireLogin>
);

export default InvoicesScene;

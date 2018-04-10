import * as React from 'react';
import { Route } from 'react-router';

import RequireLogin from 'components/utils/require-login';
import MainLayout from 'components/layouts/main-layout';

import List from './list';
import New from './new.jsx';
import Show from './show';
import Edit from './edit';

const InvoicesScene: React.SFC<{}> = () => (
  <RequireLogin>
    <MainLayout>
      <Route exact path="/invoices" component={ List } />
      <Route path="/invoices/new" component={ New } />
      <Route path="/invoices/:id/edit" component={ Edit } />
      <Route exact path="/invoices/:id" component={ Show } />
    </MainLayout>
  </RequireLogin>
);

export default InvoicesScene;

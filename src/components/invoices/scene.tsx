import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import DebtorsLayout from 'components/layouts/debtors-layout';

import List from './list';
import New from './new';
import Show from './show';
import Edit from './edit';

const InvoicesScene: React.SFC<{}> = () => (
  <RequireLogin>
    <DebtorsLayout>
      <Switch>
        <Route exact path="/invoices" component={ List } />
        <Route exact path="/invoices/unpaid" component={ List } />
        <Route path="/invoices/new" component={ New } />
        <Route exact path="/invoices/:id" component={ Show } />
        <Route path="/invoices/:id/edit" component={ Edit } />
      </Switch>
    </DebtorsLayout>
  </RequireLogin>
);

export default InvoicesScene;

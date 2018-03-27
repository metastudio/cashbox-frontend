import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import AppLayout from 'components/layouts/app-layout';

import Customers from './customers.jsx';
import New       from './new.jsx';
import Edit      from './edit.jsx';

const CustomersScene: React.SFC<{}> = () => (
  <RequireLogin>
    <AppLayout>
      <Route exact path="/customers" component={ Customers } />
      <Route path="/customers/new" component={ New } />
      <Route path="/customers/:customerId/edit" component={ Edit } />
    </AppLayout>
  </RequireLogin>
);

export default CustomersScene;
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import AppLayout from 'components/layouts/app-layout';

import List from './list';
import New  from './new.jsx';
import Edit from './edit.jsx';

const CustomersScene: React.SFC<{}> = () => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        <Switch>
          <Route exact path="/customers" component={ List } />
          <Route path="/customers/new" component={ New } />
          <Route path="/customers/:customerId/edit" component={ Edit } />
        </Switch>
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default CustomersScene;

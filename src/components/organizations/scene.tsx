import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import AppLayout from 'components/layouts/app-layout';

import Select from './select.jsx';
import New    from './new.jsx';
import List   from './list';

const OrganizationsScene: React.SFC<{}> = () => (
  <RequireLogin>
    <AppLayout>
      <Switch>
        <Route exact path="/organizations" component={ List } />
        <Route path="/organizations/new" component={ New } />
        <Route path="/organizations/select" component={ Select } />
      </Switch>
    </AppLayout>
  </RequireLogin>
);

export default OrganizationsScene;

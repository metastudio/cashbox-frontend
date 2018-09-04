import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppLayout from 'components/layouts/app-layout';
import RequireLogin from 'components/utils/require-login';

import Edit   from './edit';
import List   from './list';
import New    from './new';
import Select from './select';

const OrganizationsScene: React.SFC<{}> = () => (
  <RequireLogin>
    <AppLayout>
      <Switch>
        <Route exact path="/organizations" component={ List } />
        <Route path="/organizations/new" component={ New } />
        <Route path="/organizations/select" component={ Select } />
        <Route path="/organizations/:id/edit" component={ Edit } />
      </Switch>
    </AppLayout>
  </RequireLogin>
);

export default OrganizationsScene;

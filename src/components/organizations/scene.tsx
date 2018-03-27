import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import AppLayout from 'components/layouts/app-layout';

import Select from './select.jsx';
import New    from './new.jsx';

const OrganizationsScene: React.SFC<{}> = () => (
  <RequireLogin>
    <AppLayout>
      <Route exact path="/organizations" render={ () => <Redirect to="/organizations/select" /> } />
      <Route path="/organizations/select" component={ Select } />
      <Route path="/organizations/new" component={ New } />
    </AppLayout>
  </RequireLogin>
);

export default OrganizationsScene;

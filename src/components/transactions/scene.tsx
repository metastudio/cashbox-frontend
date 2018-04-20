import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import List from './list';
import Edit from './edit';

const DashboardScene: React.SFC<{}> = () => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <Route exact path="/transactions" component={ List } />
        <Route exact path="/transactions/:id" component={ Edit } />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default DashboardScene;

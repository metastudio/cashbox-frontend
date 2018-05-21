import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import List from './list';
import New  from './new';
import Edit from './edit';

const DashboardScene: React.SFC<{}> = () => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <Route path="/transactions" component={ List } />
        <Route exact path="/transactions/new" component={ New } />
        <Route exact path="/transactions/:id/edit" component={ Edit } />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default DashboardScene;

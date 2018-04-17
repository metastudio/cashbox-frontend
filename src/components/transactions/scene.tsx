import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import List from './list';

const DashboardScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <Route exact path="/transactions" component={ List } />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default DashboardScene;

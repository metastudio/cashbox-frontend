import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import List from './transactions.jsx';
import New from './new.jsx';

const DashboardScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <Route exact path="/transactions" component={ List } />
        <Route path="/transactions/new" component={ New } />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default DashboardScene;

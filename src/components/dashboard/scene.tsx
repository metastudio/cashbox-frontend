import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import Transactions from 'components/transactions';

const DashboardScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <Transactions />
        <Route path="/transactions/new" component={ Transactions.New } />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default DashboardScene;

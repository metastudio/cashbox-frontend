import * as React from 'react';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import Transactions from 'components/transactions/transactions.jsx';

const DashboardScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <Transactions />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default DashboardScene;

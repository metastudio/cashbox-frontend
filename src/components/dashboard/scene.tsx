import * as React from 'react';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import MainLayout from 'components/layouts/main-layout';

import TransactionsList from 'components/transactions/list';

const DashboardScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <TransactionsList />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default DashboardScene;

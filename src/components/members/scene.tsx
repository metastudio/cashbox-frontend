import * as React from 'react';
import { Route } from 'react-router-dom';

import AppLayout from 'components/layouts/app-layout';
import RequireOrganization from 'components/require-organization';
import RequireLogin from 'components/utils/require-login';

import List from './list';

const MembersScene: React.SFC = () => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        <Route path="/members" component={ List } />
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default MembersScene;

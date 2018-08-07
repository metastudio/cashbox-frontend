import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';
import AppLayout from 'components/layouts/app-layout';

import Members from './members.jsx';

const MembersScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        <Route path="/members" component={ Members } />
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default MembersScene;

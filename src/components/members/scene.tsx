import * as React from 'react';
import { Route } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import AppLayout from 'components/layouts/app-layout';

import Members from './members.jsx';

const MembersScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      <Route path="/members" component={ Members } />
    </AppLayout>
  </RequireLogin>
);

export default MembersScene;

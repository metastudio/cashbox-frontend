import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import RequireOrganization from 'components/require-organization';
import RequireLogin from 'components/utils/require-login';

import AppLayout from 'components/layouts/app-layout';

import Profile from './profile';

const UserScene: React.SFC<{}> = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        { /* tslint:disable-next-line:jsx-no-lambda */ }
        <Route exact path="/user" render={ () => <Redirect to="/user/profile" /> } />
        <Route path="/user/profile" component={ Profile } />
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
);

export default UserScene;

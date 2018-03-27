import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import RequireLogin from 'components/utils/require-login';
import RequireOrganization from 'components/require-organization';

import MainLayout from 'components/layouts/main-layout';

import Profile from './profile.jsx';

interface UserSceneType extends React.SFC<{}> {
  Profile?: React.ComponentType;
}

const UserScene: UserSceneType = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <Route exact path="/user" render={ () => <Redirect to="/user/profile" /> } />
        <Route path="/user/profile" component={ Profile } />
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
);

UserScene.Profile = Profile;

export default UserScene;

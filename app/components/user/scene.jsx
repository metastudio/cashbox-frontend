import React from 'react'

import RequireLogin from 'components/utils/require-login'
import RequireOrganization from 'components/require-organization'

import MainLayout from 'components/layouts/main-layout'

import Profile from './profile.jsx'

const UserScene = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        <h1>Edit User</h1>
        { children }
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
)

UserScene.propTypes = {
  children: React.PropTypes.node
}

UserScene.Profile = Profile

export default UserScene

import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import Members from './members.jsx'

const MembersScene = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      { children }
    </AppLayout>
  </RequireLogin>
)

MembersScene.propTypes = {
  children: React.PropTypes.node
}

MembersScene.Members = Members

export default MembersScene

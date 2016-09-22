import React from 'react'
import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

const DashboardScene = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      { children }
    </AppLayout>
  </RequireLogin>
)

DashboardScene.propTypes = {
  children: React.PropTypes.node
}

export default DashboardScene

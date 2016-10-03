import React from 'react'
import RequireLogin from 'components/utils/require-login'
import RequireOrganization from 'components/require-organization'
import AppLayout from 'components/layouts/app-layout'

const DashboardScene = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        { children }
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
)

DashboardScene.propTypes = {
  children: React.PropTypes.node
}

export default DashboardScene

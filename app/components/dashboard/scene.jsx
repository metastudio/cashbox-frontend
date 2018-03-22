import React from 'react'
import RequireLogin from 'components/utils/require-login'
import RequireOrganization from 'components/require-organization'
import MainLayout from 'components/layouts/main-layout'

const DashboardScene = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <MainLayout>
        { children }
      </MainLayout>
    </RequireOrganization>
  </RequireLogin>
)

DashboardScene.propTypes = {
  children: React.PropTypes.node
}

export default DashboardScene

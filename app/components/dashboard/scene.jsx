import React from 'react'
import RequireLogin from 'components/utils/require-login'
import RequireOrganization from 'components/require-organization'
import AppLayout from 'components/layouts/app-layout'

import Transactions from 'components/transactions'
import New from 'components/transactions/new.jsx'

const DashboardScene = ({ children }) => (
  <RequireLogin>
    <RequireOrganization>
      <AppLayout>
        <Transactions />
        { children }
      </AppLayout>
    </RequireOrganization>
  </RequireLogin>
)

DashboardScene.propTypes = {
  children: React.PropTypes.node
}

DashboardScene.NewTransaction = New

export default DashboardScene

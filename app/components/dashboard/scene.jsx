import React from 'react'
import RequireLogin from 'components/utils/require-login'
import RequireOrganization from 'components/require-organization'
import AppLayout from 'components/layouts/app-layout'

import Transactions from 'components/transactions/transactions.jsx'

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

DashboardScene.Transactions = Transactions

export default DashboardScene

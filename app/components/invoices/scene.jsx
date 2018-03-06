import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import List from './list.jsx'

const InvoicesScene = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      { children }
    </AppLayout>
  </RequireLogin>
)

InvoicesScene.propTypes = {
  children: React.PropTypes.node
}

InvoicesScene.List = List

export default InvoicesScene

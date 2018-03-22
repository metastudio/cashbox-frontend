import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import Customers from './customers.jsx'
import New from './new.jsx'
import Edit from './edit.jsx'

const CustomersScene = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      { children }
    </AppLayout>
  </RequireLogin>
)

CustomersScene.propTypes = {
  children: React.PropTypes.node
}

CustomersScene.Customers = Customers
CustomersScene.New = New
CustomersScene.Edit = Edit

export default CustomersScene

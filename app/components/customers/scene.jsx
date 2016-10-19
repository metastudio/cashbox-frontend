import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import Customers from './customers.jsx'
import NewCustomer from './new.jsx'
import EditCustomer from './edit.jsx'

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
CustomersScene.NewCustomer = NewCustomer
CustomersScene.EditCustomer = EditCustomer

export default CustomersScene

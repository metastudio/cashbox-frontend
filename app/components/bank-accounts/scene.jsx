import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import BankAccounts from './bank-accounts.jsx'
import New from './new.jsx'
import Edit from './edit.jsx'

const BankAccountsScene = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      { children }
    </AppLayout>
  </RequireLogin>
)

BankAccountsScene.propTypes = {
  children: React.PropTypes.node
}

BankAccountsScene.BankAccounts = BankAccounts
BankAccountsScene.New = New
BankAccountsScene.Edit = Edit

export default BankAccountsScene

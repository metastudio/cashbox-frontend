import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import BankAccounts from './bank-accounts.jsx'
import NewBankAccount from './new.jsx'
import EditBankAccount from './edit.jsx'

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
BankAccountsScene.NewBankAccount = NewBankAccount
BankAccountsScene.EditBankAccount = EditBankAccount

export default BankAccountsScene

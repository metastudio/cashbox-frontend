import React from 'react'

import RequireLogin from 'components/utils/require-login'
import MainLayout from 'components/layouts/main-layout'

import List from './list.jsx'
import New from './new.jsx'
import Show from './show.jsx'
import Edit from './edit.jsx'

const InvoicesScene = ({ children }) => (
  <RequireLogin>
    <MainLayout>
      { children }
    </MainLayout>
  </RequireLogin>
)

InvoicesScene.propTypes = {
  children: React.PropTypes.node
}

InvoicesScene.List = List
InvoicesScene.New = New
InvoicesScene.Show = Show
InvoicesScene.Edit = Edit

export default InvoicesScene

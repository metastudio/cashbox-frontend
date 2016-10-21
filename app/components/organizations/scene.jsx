import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import Select from './select.jsx'
import New    from './new.jsx'

const OrganizationsScene = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      { children }
    </AppLayout>
  </RequireLogin>
)

OrganizationsScene.propTypes = {
  children: React.PropTypes.node
}

OrganizationsScene.Select = Select
OrganizationsScene.New    = New

export default OrganizationsScene

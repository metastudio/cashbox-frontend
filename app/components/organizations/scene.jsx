import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import SelectOrganization from './select-organization.jsx'
import NewOrganization from './new.jsx'

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

OrganizationsScene.SelectOrganization = SelectOrganization
OrganizationsScene.NewOrganization    = NewOrganization

export default OrganizationsScene

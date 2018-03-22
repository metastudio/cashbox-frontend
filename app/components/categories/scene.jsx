import React from 'react'

import RequireLogin from 'components/utils/require-login'
import AppLayout from 'components/layouts/app-layout'

import Categories from './categories.jsx'
import New from './new.jsx'
import Edit from './edit.jsx'

const CategoriesScene = ({ children }) => (
  <RequireLogin>
    <AppLayout>
      { children }
    </AppLayout>
  </RequireLogin>
)

CategoriesScene.propTypes = {
  children: React.PropTypes.node
}

CategoriesScene.Categories = Categories
CategoriesScene.New = New
CategoriesScene.Edit = Edit

export default CategoriesScene

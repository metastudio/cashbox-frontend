import React from 'react'

import { Grid } from 'react-bootstrap'

import Footer from 'components/layouts/footer'
import FlashMessages from 'components/shared/flash-messages'
import MainMenu from 'components/layouts/main-menu'

const MainLayout = ({children}) => (
  <div>
    <MainMenu />
    <Grid fluid>
      <FlashMessages />
      { children }
    </Grid>
    <Footer />
  </div>
)

MainLayout.propTypes = {
  children: React.PropTypes.node,
}

export default MainLayout

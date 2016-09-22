import React from 'react'

import { Grid } from 'react-bootstrap'

import MainMenu from 'components/layouts/main-menu'
import Footer from 'components/layouts/footer'
import FlashMessages from 'components/shared/flash-messages'

const AppLayout = ({children}) => (
  <div>
    <MainMenu />
    <Grid fluid>
      <FlashMessages />
      { children }
    </Grid>
    <Footer />
  </div>
)

AppLayout.propTypes = {
  children: React.PropTypes.node,
}

export default AppLayout

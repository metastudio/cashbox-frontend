import React from 'react'

import { Grid } from 'react-bootstrap'

import Footer from 'components/layouts/footer'
import FlashMessages from 'components/shared/flash-messages'

const GuestLayout = ({children}) => (
  <div>
    <Grid fluid>
      <FlashMessages />
      { children }
    </Grid>
    <Footer />
  </div>
)

GuestLayout.propTypes = {
  children: React.PropTypes.node,
}

export default GuestLayout

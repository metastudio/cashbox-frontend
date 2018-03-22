import React from 'react'

import { Grid, Col, Row } from 'react-bootstrap'

import MainMenu from 'components/layouts/main-menu'
import Footer from 'components/layouts/footer'
import FlashMessages from 'components/shared/flash-messages'

const AppLayout = ({children}) => (
  <div>
    <MainMenu />
    <Grid fluid>
      <Row>
        <Col xs={18} md={12}>
          <FlashMessages />
          { children }
        </Col>
      </Row>
    </Grid>
    <Footer />
  </div>
)

AppLayout.propTypes = {
  children: React.PropTypes.node,
}

export default AppLayout

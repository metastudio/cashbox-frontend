import React from 'react'

import { Grid, Col, Row } from 'react-bootstrap'

import MainMenu from 'components/layouts/main-menu'
import Footer from 'components/layouts/footer'
import FlashMessages from 'components/shared/flash-messages'

import BankAccounts from 'components/bank-accounts'

const AppLayout = ({children}) => (
  <div>
    <MainMenu />
    <Grid fluid>
      <Row>
        <Col xs={12} md={8}>
          <FlashMessages />
          { children }
        </Col>
        <Col xs={6} md={4}>
          <h2><center>Accounts</center></h2>
          <BankAccounts />
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

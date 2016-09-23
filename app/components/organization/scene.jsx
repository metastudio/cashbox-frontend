import React from 'react'

import { Row, Col } from 'react-bootstrap'

import AppLayout from 'components/layouts/app-layout'
import Organization from './organization.jsx'

const OrganizationScene = () => (
  <AppLayout>
    <br />
    <Row>
      <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
        <h1 className="text-center">Organization</h1>
        <p className="text-center">Please enter below</p>
        <Organization />
      </Col>
    </Row>
  </AppLayout>
)

export default OrganizationScene

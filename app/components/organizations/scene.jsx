import React from 'react'

import { Row, Col } from 'react-bootstrap'

import AppLayout from 'components/layouts/app-layout'
import Organizations from './organizations.jsx'

const OrganizationsScene = () => (
  <AppLayout>
    <br />
    <Row>
      <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
        <h1 className="text-center">Your organizations</h1>
        <Organizations />
      </Col>
    </Row>
  </AppLayout>
)

export default OrganizationsScene

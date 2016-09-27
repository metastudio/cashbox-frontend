import React from 'react'

import { Row, Col } from 'react-bootstrap'

import AppLayout from 'components/layouts/app-layout'
import SelectOrganization from './select-organization.jsx'

const SelectOrganizationScene = () => (
  <AppLayout>
    <br />
    <Row>
      <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
        <h1 className="text-center">Select organization</h1>
        <SelectOrganization />
      </Col>
    </Row>
  </AppLayout>
)

export default SelectOrganizationScene

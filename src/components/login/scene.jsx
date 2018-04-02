import React from 'react'

import { Row, Col } from 'react-bootstrap'

import GuestLayout from 'components/layouts/guest-layout';
import Login from './login.jsx';

const LoginScene = () => (
  <GuestLayout>
    <br />
    <Row>
      <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
        <h1 className="text-center">Welcome to Cashbox!</h1>
        <p className="text-center">Please login below</p>
        <Login />
      </Col>
    </Row>
  </GuestLayout>
)

export default LoginScene

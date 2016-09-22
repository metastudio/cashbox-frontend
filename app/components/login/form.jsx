import React from 'react'
import { reduxForm } from 'redux-form'

import { Alert, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const LoginForm = ({ fields: { email, password }, handleSubmit, submitting, error }) => (
  <Form onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <FormGroup controlId="email">
      <ControlLabel>Email address</ControlLabel>
      <FormControl type="email" placeholder="Enter email" {...email} />
    </FormGroup>
    <FormGroup controlId="password">
      <ControlLabel>Password</ControlLabel>
      <FormControl type="password" placeholder="Enter password" {...password} />
    </FormGroup>
    <button type="submit" className="btn btn-primary center-block" disabled={ submitting }>Login</button>
  </Form>
)

LoginForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
}

export default reduxForm({
  form: 'login-form',
  fields: ['email', 'password'],
})(LoginForm)

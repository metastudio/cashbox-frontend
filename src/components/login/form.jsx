import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form'

import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap'
import { HorizontalFormInput } from 'components/utils/form-inputs';

const LoginForm = ({ fields: { email, password }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Email address" placeholder="Enter email" field={ email } />
    <HorizontalFormInput label="Password" placeholder="Enter password" type="password" field={ password } />
    <FormGroup>
      <Col smOffset={3} sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Login</Button>
      </Col>
    </FormGroup>
  </Form>
)

LoginForm.propTypes = {
  fields:       PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
}

export default reduxForm({
  form: 'login-form',
  fields: ['email', 'password'],
})(LoginForm)
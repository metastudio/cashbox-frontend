import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'

import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap'
import { HorizontalFormInput } from 'components/utils/form-inputs';

const LoginForm = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="email" label="Email address" placeholder="Enter email" type="email" component={ HorizontalFormInput } />
    <Field name="password" label="Password" placeholder="Enter password" type="password" component={ HorizontalFormInput } />
    <FormGroup>
      <Col smOffset={3} sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Login</Button>
      </Col>
    </FormGroup>
  </Form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
}

export default reduxForm({
  form: 'login-form',
})(LoginForm)

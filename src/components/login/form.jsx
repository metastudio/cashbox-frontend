import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'

import { Alert, Form, Col } from 'react-bootstrap'
import { HorizontalFormInput, HorizontalFormSubmitButton } from 'components/utils/form-inputs';

const LoginForm = ({ handleSubmit, submitting, error }) => (
  <Form className="form-horizontal" onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="email" label="Email address" placeholder="Enter email" type="email" component={ HorizontalFormInput } />
    <Field name="password" label="Password" placeholder="Enter password" type="password" component={ HorizontalFormInput } />
    <HorizontalFormSubmitButton bsStyle="primary" type="submit" disabled={ submitting }>Login</HorizontalFormSubmitButton>
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

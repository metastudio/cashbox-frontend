import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap';

import { VerticalTextInput } from 'components/utils/form-inputs';

const validate = (values) => {
  const errors = {};
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'don\'t match password';
  }
  return errors;
};

const AccountForm = ({ fields: { email, currentPassword, password, passwordConfirmation }, handleSubmit, submitting, error }) => {
  return(<Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <VerticalTextInput
      field={ email }
      label="Email *"
    />

    <VerticalTextInput
      field={ currentPassword }
      label="Current password *"
      help="we need your current password to confirm your changes"
      type="password"
    />

    <VerticalTextInput
      field={ password }
      label="Password"
      help="leave it blank if you don't want to change it"
      type="password"
    />

    <VerticalTextInput
      field={ passwordConfirmation }
      label="Password confirmation"
      type="password"
    />

    <FormGroup>
      <Col sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Update account</Button>
      </Col>
    </FormGroup>
  </Form>);
};

AccountForm.propTypes = {
  fields:       PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  store:        PropTypes.object,
  initialValue: PropTypes.object
};

export default reduxForm({
  form: 'accountForm',
  fields: ['email', 'currentPassword', 'password', 'passwordConfirmation'],
  validate
})(AccountForm);

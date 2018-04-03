import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap';

import { VerticalFormInput } from 'components/utils/form-inputs';

const validate = (values) => {
  const errors = {};
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'don\'t match password';
  }
  return errors;
};

const AccountForm = ({ handleSubmit, submitting, error }) => {
  return(<Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="email" label="Email *" component={ VerticalFormInput } />
    <Field name="currentPassword" label="Current password *" type="password" help="we need your current password to confirm your changes" component={ VerticalFormInput } />
    <Field name="password" label="Password" type="password" help="leave it blank if you don't want to change it" component={ VerticalFormInput } />
    <Field name="passwordConfirmation" label="Password confirmation" type="password" component={ VerticalFormInput } />

    <FormGroup>
      <Col sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Update account</Button>
      </Col>
    </FormGroup>
  </Form>);
};

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  store:        PropTypes.object,
  initialValue: PropTypes.object
};

export default reduxForm({
  form: 'accountForm',
  validate
})(AccountForm);

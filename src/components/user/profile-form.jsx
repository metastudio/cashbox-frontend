import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap';

import { VerticalFormInput } from 'components/utils/form-inputs';

const ProfileForm = ({ handleSubmit, submitting, error }) => {
  return(<Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="fullName" label="Full name *" placeholder="Enter full name" component={ VerticalFormInput } />
    <Field name="phoneNumber" label="Phone number" placeholder="Enter phone number" component={ VerticalFormInput } />
    <FormGroup>
      <Col sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Update profile</Button>
      </Col>
    </FormGroup>
  </Form>);
};

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  store:        PropTypes.object
};

export default reduxForm({
  form: 'profileForm',
})(ProfileForm);

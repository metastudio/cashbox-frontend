import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap';

import { VerticalTextInput } from 'components/utils/form-inputs';

const ProfileForm = ({ fields: { fullName, phoneNumber }, handleSubmit, submitting, error }) => {
  return(<Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <VerticalTextInput
      label="Full name *"
      placeholder="Enter full name"
      field={ fullName }
    />
    <VerticalTextInput
      label="Phone number"
      placeholder="Enter phone number"
      field={ phoneNumber }
    />
    <FormGroup>
      <Col sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Update profile</Button>
      </Col>
    </FormGroup>
  </Form>);
};

ProfileForm.propTypes = {
  fields:       PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  store:        PropTypes.object
};

export default reduxForm({
  form: 'profileForm',
  fields: ['fullName', 'phoneNumber'],
})(ProfileForm);

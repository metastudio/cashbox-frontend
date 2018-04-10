import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { Alert, Form } from 'react-bootstrap';
import { HorizontalFormInput, HorizontalSubmitButton } from 'components/utils/form-inputs';

const CustomerForm = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="invoiceDetails" label="Invoice Details" componentClass="textarea" type="textarea" component={ HorizontalFormInput } />
    <HorizontalSubmitButton submitting={ submitting }>Submit</HorizontalSubmitButton>
  </Form>
);

CustomerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
};

export default reduxForm({
  form: 'customer-form',
})(CustomerForm);

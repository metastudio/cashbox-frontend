import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { Alert, Form, Button } from 'react-bootstrap';
import { HorizontalFormInput } from 'components/utils/form-inputs';

let CustomerForm = ({ fields: { name, invoiceDetails }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalFormInput componentClass="textarea" label="invoiceDetails" field={ invoiceDetails } />
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Submit</Button>
  </Form>
);

CustomerForm.propTypes = {
  fields:       PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
};

CustomerForm = reduxForm({
  form: 'transaction-form',
  fields: ['name', 'invoiceDetails'],
})(CustomerForm);

CustomerForm = connect(
  state => ({
    initialValues: state.customer.data ? state.customer.data : {}
  })
)(CustomerForm);

export default CustomerForm;
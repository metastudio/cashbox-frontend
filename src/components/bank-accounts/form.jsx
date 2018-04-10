import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { getCurrencies } from 'api/currencies.js';

import { Alert, Form } from 'react-bootstrap';
import { HorizontalFormInput, HorizontalAsyncSelect, HorizontalFormSubmitButton } from 'components/utils/form-inputs';

// TOOD: refactor to use actions and redux-saga
const getOptions = () => {
  return getCurrencies().then((currencies) => ({
    options: currencies.map(item => ({ value: item, label: item }))
  }));
};

const BankAccountForm = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="description" label="Description" component={ HorizontalFormInput } />
    <Field name="invoiceDetails" label="Invoice Details" componentClass="textarea" type="textarea" component={ HorizontalFormInput } />
    <Field name="currency" label="Currency" component={ HorizontalAsyncSelect } loadOptions={ getOptions } />
    <HorizontalFormSubmitButton bsStyle="primary" type="submit" disabled={ submitting }>Submit</HorizontalFormSubmitButton>
  </Form>
);

BankAccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
};

export default reduxForm({
  form: 'transaction-form',
})(BankAccountForm)

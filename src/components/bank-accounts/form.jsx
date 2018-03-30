import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { getCurrencies } from 'api/currencies.js';

import { Alert, Form, Button } from 'react-bootstrap';
import { HorizontalFormInput, HorizontalAsyncSelect } from 'components/utils/form-inputs';

// TOOD: refactor to use actions and redux-saga
const getOptions = () => {
  return getCurrencies().then((currencies) => ({
    options: currencies.map(item => ({ value: item, label: item }))
  }));
};

const BankAccountForm = ({ fields: { name, description, invoiceDetails, currency }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalFormInput label="Description" field={ description } />
    <HorizontalFormInput componentClass="textarea" label="Invoice Details" field={ invoiceDetails } />
    <HorizontalAsyncSelect label="Currency" field={ currency } loadOptions={ getOptions }/>
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Submit</Button>
  </Form>
);

BankAccountForm.propTypes = {
  fields:       PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
};

export default reduxForm({
  form: 'transaction-form',
  fields: ['name', 'description', 'invoiceDetails', 'currency'],
})(BankAccountForm)

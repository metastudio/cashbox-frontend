import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import {
  HorizontalFormInput,
  HorizontalCurrencySelect,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

const BankAccountForm = ({ handleSubmit, submitting, error, action }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="description" label="Description" component={ HorizontalFormInput } />
    <Field name="invoiceDetails" label="Invoice Details" componentClass="textarea" type="textarea" component={ HorizontalFormInput } />
    <Field name="currency" label="Currency" component={ HorizontalCurrencySelect } required />
    <HorizontalSubmitButton bsStyle="primary" submitting={ submitting }>{ action } Bank Account</HorizontalSubmitButton>
  </Form>
);

BankAccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  action:       PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'transactionForm',
})(BankAccountForm);

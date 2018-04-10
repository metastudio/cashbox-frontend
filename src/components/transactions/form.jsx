import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import { getOrganizationCategories } from 'api/categories.js';
import { getOrganizationCustomers } from 'api/customers.js';
import { getOrganizationBankAccounts } from 'api/bank-accounts.js';

import { HorizontalFormInput, HorizontalAsyncSelect, HorizontalDatePicker, HorizontalCurrencyInput, HorizontalFormSubmitButton } from 'components/utils/form-inputs';

// TOOD: refactor to use actions and redux-saga
const getCategoryOptions = (orgId) => {
  return getOrganizationCategories(orgId).then((categories) => ({
    options: categories.map(category => ({ value: category.id, label: category.name }))
  }))
}

// TOOD: refactor to use actions and redux-saga
const getCustomerOptions = (orgId) => {
  return getOrganizationCustomers(orgId).then((customers) => ({
    options: customers.map(customer => ({ value: customer.id, label: customer.name }))
  }))
}

// TOOD: refactor to use actions and redux-saga
const getBankAccountOptions = (orgId) => {
  return getOrganizationBankAccounts(orgId).then((bankAccounts) => ({
    options: bankAccounts.map(bankAccount => ({ value: bankAccount.id, label: bankAccount.name }))
  }))
}

const TransactionForm = ({ handleSubmit, orgId, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="amount" label="Amount" component={ HorizontalCurrencyInput } />
    <Field name="category" label="Category" component={ HorizontalAsyncSelect } loadOptions={ () => getCategoryOptions(orgId) } />
    <Field name="customer" label="Customer name" component={ HorizontalAsyncSelect } loadOptions={ () => getCustomerOptions(orgId) } />
    <Field name="bankAccount" label="Bank account" component={ HorizontalAsyncSelect } loadOptions={ () => getBankAccountOptions(orgId) } />
    <Field name="comment" label="Comment" component={ HorizontalFormInput } />
    <Field name="date" label="Date" component={ HorizontalDatePicker } />
    <HorizontalFormSubmitButton bsStyle="primary" type="submit" disabled={ submitting }>Create</HorizontalFormSubmitButton>
  </Form>
)

TransactionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  orgId:        PropTypes.number.isRequired,
}

export default reduxForm({
  form: 'transaction-form'
})(TransactionForm)

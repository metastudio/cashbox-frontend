import React from 'react'
import { reduxForm } from 'redux-form'
import ApiHelpers from 'actions/_api_helpers'

import { Alert, Form, Button } from 'react-bootstrap'
import { HorizontalFormInput, HorizontalAsyncSelect } from 'components/utils/form-inputs'

const bankAccountsOptions = (input) => {
  return fetch(`/api/organizations/12/bank_accounts.json`, { method: 'GET', headers: ApiHelpers.headers })
    .then((response) => {
      return response.json();
    }).then((json) => {
      return { options: json };
    });
}

const TransactionForm = ({ fields: { amount, category, customer, bankAccount, comment, date }, loadOptions, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Amount" field={ amount } />
    <HorizontalAsyncSelect label="Category" field={ category } loadOptions={ bankAccountsOptions }/>
    <HorizontalAsyncSelect label="Customer name" field={ customer } loadOptions={ bankAccountsOptions }/>
    <HorizontalAsyncSelect label="Bank account" field={ bankAccount } loadOptions={ bankAccountsOptions }/>
    <HorizontalFormInput label="Comment" field={ comment } />
    <HorizontalFormInput label="Date" field={ date } />
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Create</Button>
  </Form>
)

TransactionForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
}

export default reduxForm({
  form: 'transaction-form',
  fields: ['amount', 'category', 'customer', 'bankAccount', 'comment', 'date'],
})(TransactionForm)

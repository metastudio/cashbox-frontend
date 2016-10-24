import React from 'react'
import { reduxForm } from 'redux-form'
import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap'

import { getOrganizationCategories, getOrganizationCustomers, getOrganizationBankAccounts } from 'api'

import { HorizontalFormInput, HorizontalAsyncSelect, HorizontalDatePicker, HorizontalCurrencyInput } from 'components/utils/form-inputs'

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

const TransactionForm = ({ fields: { amount, category, customer, bankAccount, comment, date }, handleSubmit, orgId, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalCurrencyInput label="Amount" field={ amount } />
    <HorizontalAsyncSelect label="Category" field={ category } loadOptions={ () => getCategoryOptions(orgId) }/>
    <HorizontalAsyncSelect label="Customer name" field={ customer } loadOptions={ () => getCustomerOptions(orgId) }/>
    <HorizontalAsyncSelect label="Bank account" field={ bankAccount } loadOptions={ () => getBankAccountOptions(orgId) }/>
    <HorizontalFormInput label="Comment" field={ comment } />
    <HorizontalDatePicker label="Date" field={ date } />
    <FormGroup>
      <Col smOffset={3} sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Create</Button>
      </Col>
    </FormGroup>
  </Form>
)

TransactionForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
  orgId:        React.PropTypes.number.isRequired,
}

export default reduxForm({
  form: 'transaction-form',
  fields: ['amount', 'category', 'customer', 'bankAccount', 'comment', 'date'],
})(TransactionForm)

import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { getCurrencies } from 'api'

import { Alert, Form, Button } from 'react-bootstrap'
import { HorizontalFormInput, HorizontalAsyncSelect } from 'components/utils/form-inputs'

// TOOD: refactor to use actions and redux-saga
const getOptions = () => {
  return getCurrencies().then((currencies) => ({
    options: currencies.map(item => ({ value: item, label: item }))
  }))
}

let BankAccountForm = ({ fields: { name, description, invoiceDetails, currency }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalFormInput label="Description" field={ description } />
    <HorizontalFormInput componentClass="textarea" label="Invoice Details" field={ invoiceDetails } />
    <HorizontalAsyncSelect label="Currency" field={ currency } loadOptions={ getOptions }/>
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Submit</Button>
  </Form>
)

BankAccountForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
}

BankAccountForm = reduxForm({
  form: 'transaction-form',
  fields: ['name', 'description', 'invoiceDetails', 'currency'],
})(BankAccountForm)

BankAccountForm = connect(
  state => ({
    initialValues: state.bankAccount.data ? state.bankAccount.data : { name: '', currency: 'USD' }
  })
)(BankAccountForm)

export default BankAccountForm

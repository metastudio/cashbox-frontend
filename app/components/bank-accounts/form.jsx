import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ApiHelpers from 'actions/_api_helpers'

import { Alert, Form, Button } from 'react-bootstrap'
import { HorizontalFormInput, HorizontalAsyncSelect } from 'components/utils/form-inputs'

const getOptions = () => {
  return fetch(ApiHelpers.formatUrl('/api/currencies'), { method: 'GET', headers: ApiHelpers.headers() })
    .then(response => response.json())
    .then(json => ({ options: json.map(item => ({ value: item, label: item })) }))
}

let BankAccountForm = ({ fields: { name, description, invoiceDetails, currency }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalFormInput label="Description" field={ description } />
    <HorizontalFormInput label="Invoice Details" field={ invoiceDetails } />
    <HorizontalAsyncSelect label="Currency" field={ currency } loadOptions={ () => getOptions() }/>
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
    initialValues: state.bankAccount.current ? state.bankAccount.current : {}
  })
)(BankAccountForm)

export default BankAccountForm

import React from 'react'
import { reduxForm } from 'redux-form'
import ApiHelpers from 'actions/_api_helpers'

import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap'
import { HorizontalFormInput, HorizontalAsyncSelect, HorizontalDatePicker, HorizontalCurrencyInput } from 'components/utils/form-inputs'

const getOptions = (orgId, input) => {
  return fetch(ApiHelpers.formatUrl(`/api/organizations/${orgId}/${input}`), { method: 'GET', headers: ApiHelpers.headers() })
    .then(response => response.json())
    .then(json => ({ options: json.map(item => ({ value: item.id, label: item.name })) }))
}

const TransactionForm = ({ fields: { amount, categoryId, customerId, bankAccountId, comment, date }, handleSubmit, orgId, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalCurrencyInput label="Amount" field={ amount } />
    <HorizontalAsyncSelect label="Category" field={ categoryId } loadOptions={ () => getOptions(orgId, 'categories') }/>
    <HorizontalAsyncSelect label="Customer name" field={ customerId } loadOptions={ () => getOptions(orgId, 'customers') }/>
    <HorizontalAsyncSelect label="Bank account" field={ bankAccountId } loadOptions={ () => getOptions(orgId, 'bank_accounts') }/>
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
  fields: ['amount', 'categoryId', 'customerId', 'bankAccountId', 'comment', 'date'],
})(TransactionForm)

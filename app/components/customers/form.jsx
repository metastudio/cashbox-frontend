import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Alert, Form, Button } from 'react-bootstrap'
import { HorizontalFormInput } from 'components/utils/form-inputs'

let CustomerForm = ({ fields: { name, invoiceDetails }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalFormInput componentClass="textarea" label="invoiceDetails" field={ invoiceDetails } />
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Submit</Button>
  </Form>
)

CustomerForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
}

CustomerForm = reduxForm({
  form: 'transaction-form',
  fields: ['name', 'invoiceDetails'],
})(CustomerForm)

CustomerForm = connect(
  state => ({
    initialValues: state.customer.data ? state.customer.data : {}
  })
)(CustomerForm)

export default CustomerForm

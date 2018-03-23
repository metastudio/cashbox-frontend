import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap'

import { getCurrencies } from 'api'

import { HorizontalFormInput, HorizontalAsyncSelect } from 'components/utils/form-inputs'

// TODO: refactor to use actions and saga
const getOptions = () => {
  return getCurrencies().then((currencies) => ({
    options: currencies.map(item => ({ value: item, label: item }))
  }))
}

let OrganizationForm = ({ fields: { name, defaultCurrency }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalAsyncSelect label="Currency" field={ defaultCurrency } loadOptions={ getOptions }/>
    <FormGroup>
      <Col smOffset={3} sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Create</Button>
      </Col>
    </FormGroup>
  </Form>
)

OrganizationForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
}

OrganizationForm = reduxForm({
  form: 'organization-form',
  fields: ['name', 'defaultCurrency'],
})(OrganizationForm)

OrganizationForm = connect(
  state => ({
    initialValues: { name: '', defaultCurrency: 'USD' }
  })
)(OrganizationForm)

export default OrganizationForm

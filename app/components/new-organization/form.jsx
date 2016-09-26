import React from 'react'
import { reduxForm } from 'redux-form'

import { Alert, Form, Button } from 'react-bootstrap'
import { HorizontalFormInput } from 'components/utils/form-inputs'

const OrganizationForm = ({ fields: { name, defaultCurrency }, handleSubmit, submitting, error }) => (
  <Form onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalFormInput label="Currency" field={ defaultCurrency } />
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Create</Button>
  </Form>
)

OrganizationForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
}

export default reduxForm({
  form: 'organization-form',
  fields: ['name', 'defaultCurrency'],
})(OrganizationForm)

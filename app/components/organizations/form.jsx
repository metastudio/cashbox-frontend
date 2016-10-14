import React from 'react'
import { reduxForm } from 'redux-form'
import ApiHelpers from 'actions/_api_helpers'

import { Alert, Form, Button } from 'react-bootstrap'
import { HorizontalFormInput, HorizontalAsyncSelect } from 'components/utils/form-inputs'

const getOptions = () => {
  return fetch(ApiHelpers.formatUrl('/api/currencies'), { method: 'GET', headers: ApiHelpers.headers() })
    .then(response => response.json())
    .then(json => ({ options: json.map(item => ({ value: item, label: item })) }))
}

const OrganizationForm = ({ fields: { name, defaultCurrency }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalAsyncSelect label="Currency" field={ defaultCurrency } loadOptions={ () => getOptions() }/>
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

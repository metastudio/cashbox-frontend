import React from 'react'
import { reduxForm } from 'redux-form'

import { Alert, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const OrganizationForm = ({ fields: { name, default_currency }, handleSubmit, submitting, error }) => (
  <Form onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <FormGroup controlId="name">
      <ControlLabel>Name</ControlLabel>
      <FormControl type="name" placeholder="Name" {...name} />
    </FormGroup>
    <FormGroup controlId="default_currency">
      <ControlLabel>Currency</ControlLabel>
      <FormControl type="default_currency" placeholder="Currency" {...default_currency} />
    </FormGroup>
    <button type="submit" className="btn btn-primary center-block" disabled={ submitting }>Create</button>
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
  fields: ['name', 'default_currency'],
})(OrganizationForm)

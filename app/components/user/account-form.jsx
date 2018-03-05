import React from 'react'
import { reduxForm } from 'redux-form'

import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap'

import { VerticalTextInput } from 'components/utils/form-inputs'

const AccountForm = ({ fields: { email, currentPassword, password, passwordConfirmation }, handleSubmit, submitting, error }) => {
  return(<Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <VerticalTextInput 
      field={ email }
      label="Email *"
    />

    <VerticalTextInput
      field={ currentPassword }
      label="Current password *"
      help="we need your current password to confirm your changes"
      type='password'
    />

    <VerticalTextInput
      field={ password }
      label="Password"
      help="leave it blank if you don't want to change it"
      type='password'
    />

    <VerticalTextInput
      field={ passwordConfirmation }
      label="Password confirmation"
      type='password'
    />

    <FormGroup>
      <Col sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Update account</Button>
      </Col>
    </FormGroup>
  </Form>)
}

AccountForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
  store:        React.PropTypes.object,
  initialValue: React.PropTypes.object
}

export default reduxForm({
  form: 'accountForm',
  fields: ['email', 'currentPassword', 'password', 'passwordConfirmation']
})(AccountForm)

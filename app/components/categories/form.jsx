import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Alert, Form, Button } from 'react-bootstrap'
import { HorizontalFormInput, HorizontalSelect } from 'components/utils/form-inputs'

const getOptions = () => {
  return [{value: 'Income', label: 'Income'}, {value: 'Expense', label: 'Expense'}]
}

let CategoryForm = ({ fields: { name, type }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalSelect label="Type" field={ type } collection={ getOptions() } />
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Submit</Button>
  </Form>
)

CategoryForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
}

CategoryForm = reduxForm({
  form: 'transaction-form',
  fields: ['name', 'type'],
})(CategoryForm)

CategoryForm = connect(
  state => ({
    initialValues: state.category.current ? state.category.current : {}
  })
)(CategoryForm)

export default CategoryForm

import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { Alert, Form, Button } from 'react-bootstrap';
import { HorizontalFormInput, HorizontalSelect } from 'components/utils/form-inputs';

const getOptions = () => {
  return [{ value: 'Income', label: 'Income' }, { value: 'Expense', label: 'Expense' }];
};

const CategoryForm = ({ fields: { name, type }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalSelect label="Type" field={ type } collection={ getOptions() } />
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Submit</Button>
  </Form>
);

CategoryForm.propTypes = {
  fields:       PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
};

export default reduxForm({
  form: 'category-form',
  fields: ['name', 'type'],
})(CategoryForm)

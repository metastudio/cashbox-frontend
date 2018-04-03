import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Alert, Form, Button } from 'react-bootstrap';
import { HorizontalFormInput, HorizontalSelect } from 'components/utils/form-inputs';

const getOptions = () => {
  return [{ value: 'Income', label: 'Income' }, { value: 'Expense', label: 'Expense' }];
};

const CategoryForm = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="type" label="Type" component={ HorizontalSelect } collection={ getOptions() } />
    <Button bsStyle="primary" type="submit" disabled={ submitting }>Submit</Button>
  </Form>
);

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
};

export default reduxForm({
  form: 'category-form',
})(CategoryForm)

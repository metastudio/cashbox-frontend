import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { Alert, Form } from 'react-bootstrap';
import { HorizontalFormInput, HorizontalSelect, HorizontalSubmitButton } from 'components/utils/form-inputs';

const getOptions = () => {
  return [{ value: 'Income', label: 'Income' }, { value: 'Expense', label: 'Expense' }];
};

const CategoryForm = ({ handleSubmit, submitting, error, action }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="type" label="Type" component={ HorizontalSelect } collection={ getOptions() } prompt="Select Type" />
    <HorizontalSubmitButton bsStyle="primary" submitting={ submitting }>{ action } Category</HorizontalSubmitButton>
  </Form>
);

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  action:       PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'category-form',
})(CategoryForm);

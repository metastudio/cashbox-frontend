import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import { getCurrencies } from 'services/currencies';

import { HorizontalFormInput, HorizontalAsyncSelect, HorizontalSubmitButton } from 'components/utils/form-inputs';

// TODO: refactor to use actions and saga
const getOptions = () => {
  return getCurrencies().then((currencies) => ({
    options: currencies.map(item => ({ value: item, label: item }))
  }));
};

const OrganizationForm = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="defaultCurrency" label="Currency" component={ HorizontalAsyncSelect } required loadOptions={ getOptions } />
    <HorizontalSubmitButton bsStyle="primary" submitting={ submitting }>Create</HorizontalSubmitButton>
  </Form>
);

OrganizationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
};

export default reduxForm({
  form: 'organization-form',
})(OrganizationForm);

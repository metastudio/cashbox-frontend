import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import {
  HorizontalFormInput,
  HorizontalCurrencySelect,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

const OrganizationForm = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="defaultCurrency" label="Currency" component={ HorizontalCurrencySelect } required />
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

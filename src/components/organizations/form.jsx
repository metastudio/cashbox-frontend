import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Alert, Form, Button, FormGroup, Col } from 'react-bootstrap';

import { getCurrencies } from 'api/currencies.js';

import { HorizontalFormInput, HorizontalAsyncSelect } from 'components/utils/form-inputs';

// TODO: refactor to use actions and saga
const getOptions = () => {
  return getCurrencies().then((currencies) => ({
    options: currencies.map(item => ({ value: item, label: item }))
  }));
};

const OrganizationForm = ({ fields: { name, defaultCurrency }, handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <HorizontalFormInput label="Name" field={ name } />
    <HorizontalAsyncSelect label="Currency" field={ defaultCurrency } loadOptions={ getOptions }/>
    <FormGroup>
      <Col smOffset={3} sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>Create</Button>
      </Col>
    </FormGroup>
  </Form>
);

OrganizationForm.propTypes = {
  fields:       PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
};

export default reduxForm({
  form: 'organization-form',
  fields: ['name', 'defaultCurrency'],
})(OrganizationForm);

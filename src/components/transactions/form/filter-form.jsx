import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Alert, Form, ButtonGroup, Button, Col, FormGroup } from 'react-bootstrap';

import { CategoriesSelect } from 'components/categories/select-field';
import { BankAccountsSelect } from 'components/bank-accounts/select-field';
import { CustomersSelect } from 'components/customers/select-field';
import {
  FormInput,
  DatePickerInput,
  CurrencyInput,
  SubmitButton,
} from 'components/utils/form-inputs';

const FilterForm = ({ handleSubmit, submitting, error, reset }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <FormGroup>
      <Col sm={ 4 }>
        <Field name="amount_eq" placeholder="Amount" decimalSeparator="." component={ CurrencyInput } />
      </Col>
      <Col sm={ 4 }>
        <Field name="comment_cont" placeholder="Comment" component={ FormInput } />
      </Col>
      <Col sm={ 4 }>
        { /* TODO: need to implement multi select */ }
        <Field name="category_id_eq" placeholder="Category" component={ CategoriesSelect } />
      </Col>
    </FormGroup>
    <FormGroup>
      <Col sm={ 4 }>
        { /* TODO: need to implement multi select */ }
        <Field name="bankAccount_id_eq" placeholder="Bank Account" decimalSeparator="." component={ BankAccountsSelect } />
      </Col>
      <Col sm={ 4 }>
        { /* TODO: need to implement multi select */ }
        <Field name="customer_id_eq" placeholder="Customer" component={ CustomersSelect } />
      </Col>
      <Col sm={ 4 }>
        { /* TODO: need to implement periods */ }
        <Field name="period" placeholder="Date" component={ DatePickerInput } />
      </Col>
    </FormGroup>
    <ButtonGroup className="pull-right">
      <SubmitButton submitting={ submitting }>Search</SubmitButton>
      <Button onClick={ reset }>Clear</Button>
    </ButtonGroup>
  </Form>
);

FilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  reset:        PropTypes.func,
  error:        PropTypes.string,
};

export default reduxForm({
  form: 'transaction-form'
})(FilterForm);

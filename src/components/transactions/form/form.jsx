import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import { HorizontalCategoriesSelect } from 'components/categories/select-field';
import { HorizontalBankAccountsSelect } from 'components/bank-accounts/select-field';
import { HorizontalCustomersSelect } from 'components/customers/select-field';
import {
  HorizontalFormInput,
  HorizontalDatePicker,
  HorizontalCurrencyInput,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

const TransactionForm = ({ handleSubmit, type, submitting, error, action }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="amount" label="Amount" component={ HorizontalCurrencyInput } />
    <Field name="categoryId" label="Category" component={ HorizontalCategoriesSelect } type={ type } />
    <Field name="customerId" label="Customer name" component={ HorizontalCustomersSelect } />
    <Field name="bankAccountId" label="Bank account" component={ HorizontalBankAccountsSelect } />
    <Field name="comment" label="Comment" component={ HorizontalFormInput } />
    <Field name="date" label="Date" component={ HorizontalDatePicker } />
    <HorizontalSubmitButton submitting={ submitting }>{ action } Transaction</HorizontalSubmitButton>
  </Form>
);

TransactionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  type:         PropTypes.string.isRequired,
  action:       PropTypes.oneOf(['Create', 'Update']),
};

export default reduxForm({
  form: 'transaction-form'
})(TransactionForm);

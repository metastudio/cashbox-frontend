import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import { HorizontalBankAccountsSelect } from 'components/bank-accounts/select-field';
import {
  HorizontalFormInput,
  HorizontalDatePicker,
  HorizontalCurrencyInput,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

const TransferForm = ({ handleSubmit, submitting, error, action }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="amount" label="Amount" component={ HorizontalCurrencyInput } />
    { action === 'edit' && <Field name="categoryName" label="Category" component={ HorizontalFormInput } disabled /> }
    { action === 'edit' && <Field name="fromAmount" label="From Amount" component={ HorizontalCurrencyInput } disabled /> }
    <Field name="bankAccountId" label="From" component={ HorizontalBankAccountsSelect } disabled={ action === 'edit' } />
    <Field name="referenceId" label="To" component={ HorizontalBankAccountsSelect } disabled={ action === 'edit' } />
    { action === 'new' && <Field name="exchangeRate" label="Exchange Rate" component={ HorizontalFormInput } /> }
    { action === 'new' && <Field name="comission" label="Comission" component={ HorizontalCurrencyInput } /> }
    <Field name="comment" label="Comment" component={ HorizontalFormInput } />
    <Field name="date" label="Date" component={ HorizontalDatePicker } />
    <HorizontalSubmitButton submitting={ submitting }>Submit</HorizontalSubmitButton>
  </Form>
);

TransferForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  action:       PropTypes.oneOf(['new', 'edit']),
};

export default reduxForm({
  form: 'transfer-form'
})(TransferForm);

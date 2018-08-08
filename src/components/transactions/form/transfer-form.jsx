import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import { HorizontalBankAccountsSelect } from 'components/bank-accounts/select-field';
import {
  HorizontalFormInput,
  HorizontalDatePicker,
  HorizontalCurrencyInput,
  SubmitButton,
} from 'components/utils/form-inputs';
import DestroyButton from './../destroy';

const TransferForm = ({ handleSubmit, submitting, error, action, transaction }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="amount" label="Amount" component={ HorizontalCurrencyInput } />
    { action === 'Update' && <Field name="categoryName" label="Category" component={ HorizontalFormInput } disabled /> }
    { action === 'Update' && <Field name="fromAmount" label="From Amount" component={ HorizontalCurrencyInput } disabled /> }
    <Field
      name="bankAccountId" component={ HorizontalBankAccountsSelect }
      label="From" disabled={ action === 'Update' }
    />
    <Field name="referenceId" label="To" component={ HorizontalBankAccountsSelect } disabled={ action === 'Update' } />
    { action === 'Create' && <Field name="exchangeRate" label="Exchange Rate" component={ HorizontalFormInput } /> }
    { action === 'Create' && <Field name="comission" label="Comission" component={ HorizontalCurrencyInput } /> }
    <Field name="comment" label="Comment" component={ HorizontalFormInput } />
    <Field name="date" label="Date" component={ HorizontalDatePicker } />
    { action === 'Update' && transaction && <DestroyButton transaction={ transaction } /> }
    <SubmitButton className="pull-right" submitting={ submitting }>{ action } Transfer</SubmitButton>
  </Form>
);

TransferForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  action:       PropTypes.oneOf(['Create', 'Update']),
  transaction:  PropTypes.object,
};

export default reduxForm({
  form: 'transferForm',
})(TransferForm);

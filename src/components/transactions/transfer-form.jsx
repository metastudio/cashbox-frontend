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

const TransferForm = ({ handleSubmit, orgId, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="fromBankAccount" label="From" component={ HorizontalBankAccountsSelect } />
    <Field name="toBankAccount" label="To" component={ HorizontalBankAccountsSelect } />
    <Field name="amount" label="Amount" component={ HorizontalCurrencyInput } />
    <Field name="exchangeRate" label="Exchange Rate" component={ HorizontalFormInput } />
    <Field name="comission" label="Comission" component={ HorizontalCurrencyInput } />
    <Field name="comment" label="Comment" component={ HorizontalFormInput } />
    <Field name="date" label="Date" component={ HorizontalDatePicker } />
    <HorizontalSubmitButton submitting={ submitting }>Create</HorizontalSubmitButton>
  </Form>
);

TransferForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool,
  error:        PropTypes.string,
  orgId:        PropTypes.number.isRequired,
  type:         PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'transfer-form'
})(TransferForm);

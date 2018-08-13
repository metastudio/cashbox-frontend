import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import { CategoryType } from 'services/categories';

import { HorizontalCategoriesSelect } from 'components/categories/select-field';
import { HorizontalBankAccountsSelect } from 'components/bank-accounts/select-field';
import { HorizontalCustomersSelect } from 'components/customers/select-field';
import {
  HorizontalFormInput,
  HorizontalDatePicker,
  HorizontalCurrencyInput,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

interface IOwnProps {
  type:   CategoryType;
  action: 'Create' | 'Update';
}

interface ITransactionFormData {
  amount?:        string;
  categoryId?:    number;
  customerId?:    number;
  bankAccountId?: number;
  comment?:       string;
  date?:          Date;
}

type IProps = IOwnProps & InjectedFormProps<ITransactionFormData, IOwnProps>;

const TransactionForm: React.SFC<IProps> = ({ handleSubmit, type, submitting, error, action }) => (
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

const ReduxTransactionForm = reduxForm<ITransactionFormData, IOwnProps>({
  form: 'transactionForm',
})(TransactionForm);

export { ReduxTransactionForm as default, ITransactionFormData };

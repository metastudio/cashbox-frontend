import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Form } from 'react-bootstrap';

import { HorizontalStatic } from 'components/utils/form-inputs';

interface ITransactionShowFormData {
  amount?:      string;
  category?:    string;
  customer?:    string;
  bankAccount?: string;
  comment?:     string;
  date?:        string;
}

type IProps = InjectedFormProps<ITransactionShowFormData>;

const TransactionShowForm: React.SFC<IProps> = ({}) => (
  <Form horizontal>
    <Field name="amount" label="Amount" component={ HorizontalStatic } />
    <Field name="category" label="Category" component={ HorizontalStatic } />
    <Field name="customer" label="Customer" component={ HorizontalStatic } />
    <Field name="bankAccount" label="Bank account" component={ HorizontalStatic } />
    <Field name="comment" label="Comment" component={ HorizontalStatic } />
    <Field name="date" label="Date" component={ HorizontalStatic } />
  </Form>
);

const ReduxTransactionShowForm = reduxForm<ITransactionShowFormData>({
  form: 'transactionShowForm',
})(TransactionShowForm);

export { ReduxTransactionShowForm as default, ITransactionShowFormData };

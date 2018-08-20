import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Form } from 'react-bootstrap';

import { HorizontalStatic } from 'components/utils/form-inputs';

interface ITransferShowFormData {
  amount?:       string;
  category?:     string;
  fromAmount?:   string;
  bankAccount?:  string;
  reference?:    string;
  exchangeRate?: string;
  comission?:    string;
  comment?:      string;
  date?:         string;
}

type IProps = & InjectedFormProps<ITransferShowFormData>;

const TransferForm: React.SFC<IProps> = () => {
  return (
    <Form horizontal>
      <Field name="amount" component={ HorizontalStatic } label="Amount" />
      <Field name="fromAmount" component={ HorizontalStatic } label="From Amount" />
      <Field name="bankAccount" component={ HorizontalStatic } label="From" />
      <Field name="reference" component={ HorizontalStatic } label="To" />
      <Field name="comment" component={ HorizontalStatic } label="Comment" />
      <Field name="date" component={ HorizontalStatic } label="Date" />
    </Form>
  );
};

const ReduxTransferShowForm = reduxForm<ITransferShowFormData>({
  form: 'transferShowForm',
})(TransferForm);

export { ReduxTransferShowForm as default, ITransferShowFormData };

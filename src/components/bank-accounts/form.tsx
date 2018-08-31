import * as React from 'react';
import { Alert, Form } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { HorizontalCurrencySelect } from 'components/currencies/select-field';
import {
  HorizontalCheckbox,
  HorizontalFormInput,
  HorizontalSubmitButton,
  HorizontalTextarea,
} from 'components/utils/form-inputs';

interface IOwnProps {
  action: string;
}

interface IBankAccountFormData {
  name?:           string;
  currency?:       string;
  visible?:        boolean;
  description?:    string;
  invoiceDetails?: string;
}

type IProps = IOwnProps & InjectedFormProps<IBankAccountFormData, IOwnProps>;

const BankAccountForm: React.SFC<IProps> = ({ handleSubmit, submitting, error, action }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }

    <Field name="name" label="Name" component={ HorizontalFormInput } required />
    <Field name="currency" label="Currency" component={ HorizontalCurrencySelect } required />
    <Field name="visible" label="Visible" component={ HorizontalCheckbox } />
    <Field name="description" label="Description" component={ HorizontalFormInput } />
    <Field
      name="invoiceDetails"
      component={ HorizontalTextarea }
      type="textarea"
      label="Invoice Details"
    />
    <HorizontalSubmitButton bsStyle="primary" submitting={ submitting }>
      { action } Bank Account
    </HorizontalSubmitButton>
  </Form>
);

const ReduxBankAccountForm = reduxForm<IBankAccountFormData, IOwnProps>({
  form: 'transactionForm',
})(BankAccountForm);

export { ReduxBankAccountForm as default, IBankAccountFormData };

import * as React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Form, Alert } from 'react-bootstrap';
import { SubmitButton } from 'components/utils/form-inputs';

import MainFields from './main-fields';
import { InvoiceItemFormData } from './item-fields';
import ItemsFields, { InvoiceItemsArray } from './items-fields';

interface IOwnProps {
  action: string;
}
export interface IInvoiceFormData {
  currency:       string;
  bankAccountId?: number;
  number?:        number;
  customerId?:    number;
  startsAt?:      Date;
  endsAt?:        Date;
  amount?:        string;
  sentAt?:        Date;
  paidAt?:        Date;
  invoiceItems:   InvoiceItemFormData[];
}

type IProps = IOwnProps & InjectedFormProps<IInvoiceFormData, IOwnProps>;

const InvoiceForm: React.SFC<IProps> = props => (
  <Form onSubmit={ props.handleSubmit }>
    { props.error && <Alert bsStyle="danger">{ props.error }</Alert> }

    <MainFields />

    <h3>Items</h3>
    <InvoiceItemsArray name="invoiceItems" component={ ItemsFields } />

    <SubmitButton
      submitting={ props.submitting }
      invalid={ props.invalid }
      submitSucceeded={ props.submitSucceeded }
      submitFailed={ props.submitFailed }
    >
      { props.action } Invoice
    </SubmitButton>
  </Form>
);

export default reduxForm<IInvoiceFormData, IOwnProps>({
  form: 'invoiceForm',
})(InvoiceForm);

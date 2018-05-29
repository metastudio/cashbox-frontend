import * as React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Form, Alert } from 'react-bootstrap';

import { SubmitButton } from 'components/utils/form-inputs';

import MainFields from './main-fields';
import { InvoiceItemFormData } from './item-fields';
import ItemsFields, { InvoiceItemsArray } from './items-fields';

interface OwnProps {
  action: string;
}
export interface InvoiceFormData {
  currency:     string;
  number?:      number;
  customerId?:  number;
  startsAt?:    Date;
  endsAt?:      Date;
  amount?:      string;
  sentAt?:      Date;
  paidAt?:      Date;
  invoiceItems: InvoiceItemFormData[];
}

type Props = OwnProps & InjectedFormProps<InvoiceFormData, OwnProps>;

const InvoiceForm: React.SFC<Props> = (props) => (
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

export default reduxForm<InvoiceFormData, OwnProps>({
  form: 'invoiceForm',
})(InvoiceForm);

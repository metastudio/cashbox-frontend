import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { SubmitButton } from 'components/utils/form-inputs';
import { InvoiceItemFormData } from './item-fields';
import ItemsFields, { InvoiceItemsArray } from './items-fields';
import MainFields from './main-fields';

interface IOwnProps {
  action: string;
}
interface IInvoiceFormData {
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

const InvoiceFormContainer = reduxForm<IInvoiceFormData, IOwnProps>({
  form: 'invoiceForm',
})(InvoiceForm);

export { InvoiceFormContainer as default, IInvoiceFormData };

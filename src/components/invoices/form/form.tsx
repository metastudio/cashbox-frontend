import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { INVOICE_FORM } from 'constants/forms';
import { IInvoiceFormData } from 'services/redux-form/invoice-form';

import { VerticalSubmitButton } from 'components/utils/form-inputs';
import ItemsFields, { InvoiceItemsArray } from './items-fields';
import MainFields from './main-fields';

interface IOwnProps {
  action: string;
}
type IProps = IOwnProps & InjectedFormProps<IInvoiceFormData, IOwnProps>;

const InvoiceForm: React.SFC<IProps> = props => (
  <Form onSubmit={ props.handleSubmit }>
    { props.error && <Alert bsStyle="danger">{ props.error }</Alert> }

    <MainFields />
    <InvoiceItemsArray name="invoiceItems" component={ ItemsFields } rerenderOnEveryChange />

    <VerticalSubmitButton
      submitting={ props.submitting }
      invalid={ props.invalid }
      submitSucceeded={ props.submitSucceeded }
      submitFailed={ props.submitFailed }
    >
      { props.action } Invoice
    </VerticalSubmitButton>
  </Form>
);

const InvoiceFormContainer = reduxForm<IInvoiceFormData, IOwnProps>({
  form: INVOICE_FORM,
})(InvoiceForm);

export { InvoiceFormContainer as default, IInvoiceFormData };

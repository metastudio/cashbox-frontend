import * as React from 'react';
import { reduxForm, Field, FieldArray, InjectedFormProps, WrappedFieldArrayProps, GenericFieldArray } from 'redux-form';
import { Form, Alert, Button } from 'react-bootstrap';

import { Money } from 'model-types';
import {
  VerticalFormInput,
  VerticalCurrencySelect,
  VerticalDatePicker,
  VerticalCurrencyInput,
  SubmitButton,
} from 'components/utils/form-inputs';
import { VerticalCustomersSelect } from 'components/customers/select-field';

interface OwnProps {
  action: string;
}
export interface InvoiceItemFormData {
  customerId?:  number;
  amount?:      Money;
  date?:        Date;
  hours?:       number;
  description?: string;
}
export interface InvoiceFormData {
  currency?:    string;
  number?:      number;
  customerId?:  number;
  startsAt?:    Date;
  endsAt?:      Date;
  amount?:      Money;
  sentAt?:      Date;
  paidAt?:      Date;
  invoiceItems: InvoiceItemFormData[];
}

type Props = OwnProps & InjectedFormProps<InvoiceFormData, OwnProps>;

interface InvoiceItemFieldsProps {
  name: string;
  idx:  number;
}

const InvoiceItemFields: React.SFC<InvoiceItemFieldsProps> = ({ name, idx }) => (
  <>
    <h4>Item { idx + 1 }</h4>
    <Field name={ `${name}.customerId` } component={ VerticalCustomersSelect } label="Customer" />
    <Field name={ `${name}.amount` } component={ VerticalCurrencyInput } label="Amount *" />
    <Field name={ `${name}.date` } component={ VerticalDatePicker } label="Date" />
    <Field name={ `${name}.hours` } component={ VerticalFormInput } type="number" label="Hours" />
    <Field name={ `${name}.description` } component={ VerticalFormInput } type="textarea" label="Description" />
  </>
);

const InvoiceItemsFields: React.SFC<WrappedFieldArrayProps<InvoiceItemFormData>> = ({ fields }) => (
  <>
    { fields.map((name, i) => <InvoiceItemFields key={ i } name={ name } idx={ i } />) }

    <Button onClick={ () => fields.push({}) }>Add Item</Button>
  </>
);
const InvoiceItemsArray = FieldArray as new () => GenericFieldArray<InvoiceItemFormData>;

const InvoiceForm: React.SFC<Props> = (props) => (
  <Form onSubmit={ props.handleSubmit }>
    { props.error && <Alert bsStyle="danger">{ props.error }</Alert> }

    <Field name="currency" component={ VerticalCurrencySelect } label="Currency *" />
    <Field name="number" component={ VerticalFormInput } type="number" label="Number" />
    <Field name="customerId" component={ VerticalCustomersSelect } label="Customer *" />
    <Field name="startsAt" component={ VerticalDatePicker } label="Starts at" />
    <Field name="endsAt" component={ VerticalDatePicker } label="Ends at *" />
    <Field name="amount" component={ VerticalCurrencyInput } label="Amount *" />
    <Field name="sentAt" component={ VerticalDatePicker } label="Sent at" />
    <Field name="paidAt" component={ VerticalDatePicker } label="Paid at" />

    <h3>Invoice items:</h3>
    <InvoiceItemsArray name="invoiceItems" component={ InvoiceItemsFields } />

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

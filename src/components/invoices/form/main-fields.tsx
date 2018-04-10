import * as React from 'react';
import { Field } from 'redux-form';

import {
  VerticalFormInput,
  VerticalCurrencySelect,
  VerticalDatePicker,
  VerticalCurrencyInput,
} from 'components/utils/form-inputs';
import { VerticalCustomersSelect } from 'components/customers/select-field';

const InvoieMainFields = () => (
  <>
    <Field name="currency" component={ VerticalCurrencySelect } label="Currency *" />
    <Field name="number" component={ VerticalFormInput } type="number" label="Number" />
    <Field name="customerId" component={ VerticalCustomersSelect } label="Customer *" />
    <Field name="startsAt" component={ VerticalDatePicker } label="Starts at" />
    <Field name="endsAt" component={ VerticalDatePicker } label="Ends at *" />
    <Field name="amount" component={ VerticalCurrencyInput } label="Amount *" />
    <Field name="sentAt" component={ VerticalDatePicker } label="Sent at" />
    <Field name="paidAt" component={ VerticalDatePicker } label="Paid at" />
  </>
);

export default InvoieMainFields;

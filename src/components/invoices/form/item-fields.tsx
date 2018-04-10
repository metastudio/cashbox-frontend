import * as React from 'react';
import { Field } from 'redux-form';

import { Money } from 'model-types';
import {
  VerticalFormInput,
  VerticalDatePicker,
  VerticalCurrencyInput,
} from 'components/utils/form-inputs';
import { VerticalCustomersSelect } from 'components/customers/select-field';

interface InvoiceItemFormData {
  customerId?:  number;
  amount?:      Money;
  date?:        Date;
  hours?:       number;
  description?: string;
}

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

export { InvoiceItemFields as default, InvoiceItemFormData };

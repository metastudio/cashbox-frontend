import * as React from 'react';

import { Field } from 'redux-form';

import { HorizontalCustomersSelect } from 'components/customers/select-field';
import {
  HorizontalDatePicker,
  HorizontalFormInput,
  HorizontalMoneyInput,
} from 'components/utils/form-inputs';

interface InvoiceItemFormData {
  _destroy?:    boolean;
  id?:          number;
  customerId?:  number;
  amount?:      string;
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
    <Field name={ `${name}._destroy` } component={ HorizontalFormInput } type="hidden" />
    <Field name={ `${name}.customerId` } component={ HorizontalCustomersSelect } label="Customer" />
    <Field name={ `${name}.amount` } component={ HorizontalMoneyInput } label="Amount" required />
    <Field name={ `${name}.date` } component={ HorizontalDatePicker } label="Date" />
    <Field name={ `${name}.hours` } component={ HorizontalFormInput } type="number" label="Hours" />
    <Field name={ `${name}.description` } component={ HorizontalFormInput } type="textarea" label="Description" />
  </>
);

export { InvoiceItemFields as default, InvoiceItemFormData };

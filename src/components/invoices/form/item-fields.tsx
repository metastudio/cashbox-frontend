import * as React from 'react';

import { Field } from 'redux-form';

import { NoLabelCustomersSelect } from 'components/customers/select-field';
import {
  NoLabelDatePicker,
  NoLabelFormInput,
  NoLabelMoneyInput,
} from 'components/utils/form-inputs';

import RemoveItemButton from './remove-item';

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
  name:        string;
  idx:         number;
  invoiceItem: InvoiceItemFormData;
}

const InvoiceItemFields: React.SFC<InvoiceItemFieldsProps> = ({ name, idx, invoiceItem }) => (
  <tr>
    <td style={ { verticalAlign: 'middle' } }>{ idx + 1 }</td>
    <td>
      <Field name={ `${name}.customerId` } component={ NoLabelCustomersSelect } label="Customer" />
    </td>
    <td>
      <Field name={ `${name}.amount` } component={ NoLabelMoneyInput } label="Amount" required />
    </td>
    <td>
      <Field name={ `${name}.date` } component={ NoLabelDatePicker } label="Date" />
    </td>
    <td>
      <Field name={ `${name}.hours` } component={ NoLabelFormInput } type="number" label="Hours" />
    </td>
    <td>
      <Field name={ `${name}.description` } component={ NoLabelFormInput } type="textarea" label="Description" />
    </td>
    <td style={ { verticalAlign: 'middle' } }>
      <RemoveItemButton
        name={ name }
        idx={ idx }
        invoiceItem={ invoiceItem }
      />
    </td>
  </tr>
);

export { InvoiceItemFields as default, InvoiceItemFormData };

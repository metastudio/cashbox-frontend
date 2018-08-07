import * as React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

import {
  VerticalFormInput,
  VerticalDatePicker,
  VerticalCurrencyInput,
} from 'components/utils/form-inputs';
import { VerticalCurrencySelect } from 'components/currencies/select-field';
import { VerticalCustomersSelect } from 'components/customers/select-field';
import { VerticalBankAccountsSelect } from 'components/bank-accounts/select-field';

const InvoieMainFields = () => (
  <Row>
    <Col xs={ 12 } sm={ 6 }>
      <Field name="currency" component={ VerticalCurrencySelect } label="Currency" required />
      <Field name="bankAccountId" component={ VerticalBankAccountsSelect } label="Bank account" />
      <Field name="customerId" component={ VerticalCustomersSelect } label="Customer" required />
      <Field name="startsAt" component={ VerticalDatePicker } label="Starts at" />
      <Field name="endsAt" component={ VerticalDatePicker } label="Ends at" required />
    </Col>
    <Col xs={ 12 } sm={ 6 }>
      <Field name="number" component={ VerticalFormInput } label="Number" />
      <Field name="amount" component={ VerticalCurrencyInput } label="Amount" required />
      <Field name="sentAt" component={ VerticalDatePicker } label="Sent at" />
      <Field name="paidAt" component={ VerticalDatePicker } label="Paid at" />
    </Col>
  </Row>
);

export default InvoieMainFields;

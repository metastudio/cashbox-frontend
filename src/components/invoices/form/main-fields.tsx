import * as React from 'react';

import { Col, Row } from 'react-bootstrap';
import { Field } from 'redux-form';

import { HorizontalBankAccountsSelect } from 'components/bank-accounts/select-field';
import { HorizontalCurrencySelect } from 'components/currencies/select-field';
import { HorizontalCustomersSelect } from 'components/customers/select-field';
import {
  HorizontalDatePicker,
  HorizontalFormInput,
  HorizontalMoneyInput,
} from 'components/utils/form-inputs';

const InvoieMainFields = () => (
  <Row>
    <Col xs={ 12 } md={ 6 }>
      <Field name="currency" component={ HorizontalCurrencySelect } label="Currency" required />
      <Field name="customerId" component={ HorizontalCustomersSelect } label="Customer" required />
      <Field name="bankAccountId" component={ HorizontalBankAccountsSelect } label="Bank account" />
      <Field name="startsAt" component={ HorizontalDatePicker } label="Starts at" />
      <Field name="endsAt" component={ HorizontalDatePicker } label="Ends at" required />
    </Col>
    <Col xs={ 12 } md={ 6 }>
      <Field name="number" component={ HorizontalFormInput } label="Number" />
      <Field name="amount" component={ HorizontalMoneyInput } label="Amount" required />
      <Field name="sentAt" component={ HorizontalDatePicker } label="Sent at" />
      <Field name="paidAt" component={ HorizontalDatePicker } label="Paid at" />
    </Col>
  </Row>
);

export default InvoieMainFields;

import * as React from 'react';

import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { selectInvoiceFormHasItems } from 'services/redux-form/invoice-form';

import { VerticalBankAccountsSelect } from 'components/bank-accounts/select-field';
import { VerticalCurrencySelect } from 'components/currencies/select-field';
import { VerticalCustomersSelect } from 'components/customers/select-field';
import {
  VerticalDatePicker,
  VerticalFormInput,
  VerticalMoneyInput,
} from 'components/utils/form-inputs';
import { IGlobalState } from 'services/global-state';

interface IStateProps {
  hasItems: boolean;
}

const InvoieMainFields: React.SFC<IStateProps> = ({ hasItems }) => (
  <Row>
    <Col xs={ 12 } md={ 6 }>
      <Field name="currency" component={ VerticalCurrencySelect } label="Currency" required />
      <Field name="customerId" component={ VerticalCustomersSelect } label="Customer" required />
      <Field name="bankAccountId" component={ VerticalBankAccountsSelect } label="Bank account" />
      <Field name="startsAt" component={ VerticalDatePicker } label="Starts at" />
      <Field name="endsAt" component={ VerticalDatePicker } label="Ends at" required />
    </Col>
    <Col xs={ 12 } md={ 6 }>
      <Field name="number" component={ VerticalFormInput } label="Number" />
      <Field name="amount" component={ VerticalMoneyInput } label="Amount" required disabled={ hasItems } />
      <Field name="sentAt" component={ VerticalDatePicker } label="Sent at" />
      <Field name="paidAt" component={ VerticalDatePicker } label="Paid at" />
    </Col>
  </Row>
);

const mapState = (state: IGlobalState): IStateProps => ({
  hasItems: selectInvoiceFormHasItems(state),
});

export default connect<IStateProps>(mapState)(InvoieMainFields);

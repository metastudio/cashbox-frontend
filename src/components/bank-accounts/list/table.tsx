import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { BankAccount, selectBankAccountsWithCurrency } from 'services/bank-accounts';

import Row from './table-row';

interface OwnProps {
  currency: string;
}

interface StateProps {
  bankAccounts: BankAccount[];
}

type Props = OwnProps & StateProps;

const BankAccountsTable: React.SFC<Props> = ({ bankAccounts }) => (
  <Table striped responsive hover id="bankAccounts">
    <thead>
      <tr>
        <th className="col-xs-3">Name</th>
        <th className="col-xs-1">Balance</th>
        <th className="col-xs-4">Description</th>
        <th className="col-xs-3">Invoice Details</th>
        <th className="col-xs-1" colSpan={ 2 } />
      </tr>
    </thead>
    <tbody>
      { bankAccounts.map((ba) => ba ? <Row bankAccount={ ba } key={ ba.id } /> : null) }
  </tbody>
  </Table>
);

const mapState = (state: {}, props: OwnProps) => ({
  bankAccounts: selectBankAccountsWithCurrency(state, props.currency),
});

export default connect<StateProps, {}, OwnProps>(mapState)(BankAccountsTable);

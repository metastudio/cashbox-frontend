import * as React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { IBankAccount, selectBankAccountsWithCurrency } from 'services/bank-accounts';

import Row from './table-row';

interface IOwnProps {
  currency: string;
}

interface IStateProps {
  bankAccounts: IBankAccount[];
}

type IProps = IOwnProps & IStateProps;

const BankAccountsTable: React.SFC<IProps> = ({ bankAccounts }) => (
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
      { bankAccounts.map(ba => ba ? <Row bankAccount={ ba } key={ ba.id } /> : null) }
  </tbody>
  </Table>
);

const mapState = (state: {}, props: IOwnProps) => ({
  bankAccounts: selectBankAccountsWithCurrency(state, props.currency),
});

export default connect<IStateProps, {}, IOwnProps>(mapState)(BankAccountsTable);

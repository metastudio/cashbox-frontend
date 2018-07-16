import * as React from 'react';
import { Table } from 'react-bootstrap';

import { BankAccount } from 'services/bank-accounts';

import Row from './table-row';

interface Props {
  bankAccounts: BankAccount[];
}

const BankAccountsTable: React.SFC<Props> = ({ bankAccounts }) => (
  <Table striped responsive hover id="bankAccounts">
    <thead>
      <tr>
        <th>Name</th>
        <th>Currency</th>
        <th>Description</th>
        <th>Balance</th>
        <th>Invoice Details</th>
        <th colSpan={ 2 } />
      </tr>
    </thead>
    <tbody>
      { bankAccounts.map((ba) => ba ? <Row bankAccount={ ba } key={ ba.id } /> : null) }
  </tbody>
  </Table>
);

export default BankAccountsTable;

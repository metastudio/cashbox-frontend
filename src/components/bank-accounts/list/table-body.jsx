import * as React from 'react';
import Row from './table-row.jsx';

const BankAccountsTableBody = ({ bankAccounts }) => (
  <tbody>
    { bankAccounts.map((ba) => <Row bankAccount={ ba } key={ ba.id } />) }
  </tbody>
);

export default BankAccountsTableBody;

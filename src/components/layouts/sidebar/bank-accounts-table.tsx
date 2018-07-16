import * as React from 'react';
import { Table } from 'react-bootstrap';

import { BankAccount, formatBankAccountName } from 'services/bank-accounts';
import { formatMoney } from 'utils/money';

import 'components/transactions/css/default.css';

interface Props {
  bankAccounts: BankAccount[];
}

const SidebarBankAccountsTable: React.SFC<Props> = ({ bankAccounts }) => {

  const accounts = bankAccounts.map((bankAccount) => {
    const colorClass = Number(bankAccount.balance.fractional) > 0 ? 'positive' : 'negative';

    return (
      <tr key={ bankAccount.id }>
        <td>{ formatBankAccountName(bankAccount) }</td>
        <td className={ `text-right ${colorClass}` }>{ formatMoney(bankAccount.balance) }</td>
      </tr>
    );
  });

  return (
    <Table striped responsive id="bankAccounts">
      <thead>
        <tr>
          <th>Account</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        { accounts }
      </tbody>
    </Table>
  );
};

export default SidebarBankAccountsTable;
